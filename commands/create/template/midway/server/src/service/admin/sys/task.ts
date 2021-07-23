import { App, Inject, Provide } from '@midwayjs/decorator';
import { BaseService } from '../../base';
import { InjectEntityModel } from '@midwayjs/orm';
import SysTask from '../../../entity/admin/sys/task';
import { Repository } from 'typeorm';
import { CreateTaskDto, UpdateTaskDto } from '../../../dto/admin/sys/task';
import { IMidwayApplication } from '@midwayjs/core';
import { BullService } from 'midway-bull';
import { SysTaskQueue } from '../../../task/sys-task';

@Provide()
export class AdminSysTaskService extends BaseService {
  @Inject('bull:bullService')
  bullService: BullService;

  @InjectEntityModel(SysTask)
  sysTask: Repository<SysTask>;

  @App()
  app: IMidwayApplication;

  /**
   * 初始化任务，系统启动前调用
   */
  async initTask(): Promise<void> {
    const jobs = await this.bullService
      .getQueue(SysTaskQueue)
      .getJobs([
        'active',
        'delayed',
        'failed',
        'paused',
        'waiting',
        'completed',
      ]);
    for (let i = 0; i < jobs.length; i++) {
      // 先移除所有已存在的任务
      await jobs[i].remove();
    }
    // 查找所有需要运行的任务
    const tasks = await this.sysTask.find({ status: 1 });
    if (tasks && tasks.length > 0) {
      for (const t of tasks) {
        this.start(t);
      }
    }
  }

  /**
   * 分页查询
   */
  async page(page: number, count: number): Promise<SysTask[]> {
    const result = await this.sysTask.find({
      order: {
        id: 'ASC',
      },
      take: count,
      skip: page * count,
    });
    return result;
  }

  /**
   * count task
   */
  async count(): Promise<number> {
    return await this.sysTask.count();
  }

  /**
   * task info
   */
  async info(id: number): Promise<SysTask> {
    return await this.sysTask.findOne({ id });
  }

  /**
   * delete task
   */
  async delete(task: SysTask): Promise<void> {
    if (!task) {
      throw new Error('Task is Empty');
    }
    await this.stop(task);
    await this.sysTask.delete(task.id);
  }

  /**
   * 手动执行一次
   */
  async once(task: SysTask): Promise<void | never> {
    if (task) {
      await this.bullService
        .getQueue(SysTaskQueue)
        .add(
          { id: task.id, service: task.service, args: task.data },
          { jobId: task.id, removeOnComplete: true, removeOnFail: true }
        );
    } else {
      throw new Error('Task is Empty');
    }
  }

  /**
   * 添加任务
   */
  async addOrUpdate(param: CreateTaskDto | UpdateTaskDto): Promise<void> {
    const result = await this.sysTask.save(param);
    const task = await this.info(result.id);
    if (result.status === 0) {
      await this.stop(task!);
    } else if (result.status === 1) {
      await this.start(task!);
    }
  }

  /**
   * 启动任务
   */
  async start(task: SysTask): Promise<void> {
    if (!task) {
      throw new Error('Task is Empty');
    }
    // 先停掉之前存在的任务
    await this.stop(task);
    let repeat: any;
    if (task.type === 1) {
      // 间隔 Repeat every millis (cron setting cannot be used together with this setting.)
      repeat = {
        every: task.every,
      };
    } else {
      // cron
      repeat = {
        cron: task.cron,
      };
      // Start date when the repeat job should start repeating (only with cron).
      if (task.startTime) {
        repeat.startDate = task.startTime;
      }
      if (task.endTime) {
        repeat.endDate = task.endTime;
      }
    }
    if (task.limit > 0) {
      repeat.limit = task.limit;
    }
    const job = await this.bullService
      .getQueue(SysTaskQueue)
      .add(
        { id: task.id, service: task.service, args: task.data },
        { jobId: task.id, removeOnComplete: true, removeOnFail: true, repeat }
      );
    if (job && job.opts) {
      await this.sysTask.update(task.id, {
        jobOpts: JSON.stringify(job.opts.repeat),
        status: 1,
      });
    } else {
      // update status to 0，标识暂停任务，因为启动失败
      job && (await job.remove());
      await this.sysTask.update(task.id, { status: 0 });
      throw new Error('Task Start failed');
    }
  }

  /**
   * 停止任务
   */
  async stop(task: SysTask): Promise<void> {
    if (!task) {
      throw new Error('Task is Empty');
    }
    const exist = await this.existJob(task.id.toString());
    if (!exist) {
      await this.sysTask.update(task.id, { status: 0 });
      return;
    }
    const jobs = await this.bullService
      .getQueue(SysTaskQueue)
      .getJobs([
        'active',
        'delayed',
        'failed',
        'paused',
        'waiting',
        'completed',
      ]);
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].data.id === task.id) {
        await jobs[i].remove();
      }
    }
    await this.sysTask.update(task.id, { status: 0 });
    // if (task.jobOpts) {
    //   await this.app.queue.sys.removeRepeatable(JSON.parse(task.jobOpts));
    //   // update status
    //   await this.getRepo().admin.sys.Task.update(task.id, { status: 0 });
    // }
  }

  /**
   * 查看队列中任务是否存在
   */
  async existJob(jobId: string): Promise<boolean> {
    const jobs = await this.bullService
      .getQueue(SysTaskQueue)
      .getRepeatableJobs();
    const ids = jobs.map(e => {
      return e.id;
    });
    return ids.includes(jobId);
  }

  /**
   * 更新是否已经完成，完成则移除该任务并修改状态
   */
  async updateTaskCompleteStatus(tid: number): Promise<void> {
    const jobs = await this.bullService
      .getQueue(SysTaskQueue)
      .getRepeatableJobs();
    const task = await this.sysTask.findOne({ id: tid });
    // 如果下次执行时间小于当前时间，则表示已经执行完成。
    for (const job of jobs) {
      const currentTime = new Date().getTime();
      if (job.id === tid.toString() && job.next < currentTime) {
        // 如果下次执行时间小于当前时间，则表示已经执行完成。
        await this.stop(task);
        break;
      }
    }
  }

  /**
   * 根据serviceName调用service
   */
  async callService(serviceName: string, args: string): Promise<void> {
    if (serviceName) {
      const arr = serviceName.split('.');
      if (arr.length < 1) {
        throw new Error('serviceName define error');
      }
      const container = this.app.getApplicationContext();
      let serviceTmp = await container.getAsync(arr[0]);
      for (let i = 1; i < arr.length; i++) {
        if (i === arr.length - 1) {
          if (args) {
            await serviceTmp[arr[arr.length - 1]](JSON.parse(args));
          } else {
            await serviceTmp[arr[arr.length - 1]]();
          }
        } else {
          serviceTmp = serviceTmp[arr[i]];
        }
      }
    }
  }
}
