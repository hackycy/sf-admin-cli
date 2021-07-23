import {
  ALL,
  Body,
  Config,
  Get,
  Inject,
  Post,
  Provide,
  Validate,
  Controller,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { res } from '../../../common/utils';
import { KickDto } from '../../../dto/admin/sys/online';
import { ResOp } from '../../../interface';
import { AdminSysOnlineService } from '../../../service/admin/sys/online';
import { AdminSysUserService } from '../../../service/admin/sys/user';
import { BaseController, ADMIN_PREFIX_URL } from '../../base';
import { GetOnlineAdminListExample } from '../swagger';

@Provide()
@Controller(`${ADMIN_PREFIX_URL}/sys/online`, {
  tagName: 'AdminSysOnline',
  description: '后台在线用户控制器',
})
export class AdminSysOnlineController extends BaseController {
  @Inject()
  adminSysOnlineService: AdminSysOnlineService;

  @Inject()
  adminSysUserService: AdminSysUserService;

  @Config('rootRoleId')
  rootRoleId: number;

  @(CreateApiDoc()
    .summary('查询当前在线用户')
    .respond(200, '', 'json', {
      example: GetOnlineAdminListExample,
    })
    .build())
  @Get('/list')
  async list(): Promise<ResOp> {
    return res({
      data: await this.adminSysOnlineService.list(),
    });
  }

  @(CreateApiDoc()
    .summary('下线指定在线用户')
    .respond(200, '', 'json', {
      example: res(),
    })
    .build())
  @Post('/kick')
  @Validate()
  async kick(@Body(ALL) dto: KickDto): Promise<ResOp> {
    if (dto.id === this.ctx.admin.uid) {
      return res({ code: 10012 });
    }
    const rootUserId = await this.adminSysUserService.findRootUserId();
    if (dto.id === rootUserId) {
      return res({ code: 10013 });
    }
    await this.adminSysUserService.forbidden(dto.id);
    return res();
  }
}
