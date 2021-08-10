# 快速上手

## 项目初始化

使用脚手架 [@sfadminltd/cli](/cli/) 创建一个标准的Nest项目：

``` bash
sfadmin create my-project
```

::: tip 注意
请根据提示选择 **midway** 模板
:::

待脚手架创建项目完毕后，进入`my-project`目录，会有一个`server`和`vue`文件夹，分别是后端代码以及前端代码。

## 导入脚本

命令行进入到创建好的后端目录`my-project/server`后，执行脚手架`load`命令导入sql脚本，所有的脚本都位于`sql`目录

``` bash
$ sfadmin load -e ./sql -u root -p 123456 -t 3306 -a localhost -b my-admin -o
SF-ADMIN-CLI info load Trying to connect...
SF-ADMIN-CLI info load Connection succeeded
SF-ADMIN-CLI notice load importing sql: my-project/server/sql/init.sql
SF-ADMIN-CLI info load import sql done
┌─────────┬───────────────────────┐
│ (index) │  Tables_in_my-admin   │
├─────────┼───────────────────────┤
│    0    │   'sys_department'    │
│    1    │    'sys_login_log'    │
│    2    │      'sys_menu'       │
│    3    │     'sys_req_log'     │
│    4    │      'sys_role'       │
│    5    │ 'sys_role_department' │
│    6    │    'sys_role_menu'    │
│    7    │      'sys_task'       │
│    8    │    'sys_task_log'     │
│    9    │      'sys_user'       │
│   10    │    'sys_user_role'    │
└─────────┴───────────────────────┘
```

> 示例下的命令参数具体含义请查看[CLI教程](/cli/)

::: tip 注意
这里需要你提前准备好MySQL环境
<br />
也可以不使用脚手架进行导入，可自行手动创建数据库及导入脚本
:::

## 修改开发配置

后端文件配置在后端目录下的`src/config`

``` bash
|─config.local.ts
|─plugin.ts
|─config.prod.ts
|─config.default.ts
|─config.unittest.ts
```

开发环境下请修改`config.local.ts`，生产环境下修改`config.prod.ts`。

配置功能请查看Midway官方文档：[多环境配置](https://www.yuque.com/midwayjs/midway_v2/env_config)

## 运行

分别进入后端目录及前端目录，运行`npm run dev`即可

``` bash
# server
$ cd server
$ npm run dev
# vue
$ cd vue
$ npm run dev
```

运行后即可访问： [http://localhost:9528/](http://localhost:9528/) 

## 目录结构说明

后端`src`目录结构：

``` bash
|─dto # Api参数校验DTO定义
|─middleware # 中间件
|─config # 项目配置
|─entity # TypeORM实体类定义
|─controller
| |─base.ts # 基类Controller
| |─admin # 后台模块controller
| | |─swagger.ts # swagger文档
|─common # 项目通用工具及错误码
| |─error_constants.ts
| |─utils.ts
|─interface.ts
|─task # 基于 midway-bull 包定义的定时任务
|─service
| |─base.ts # BaseService基类
| |─admin # Admin模块
| | |─comm # 通用模块
| | |─sys # 系统模块
| | |─interface.ts
| |─subscribe # 定时任务定义
| |─common
| | |─mailer # 邮件服务
| | |─amap # 高德api
|─configuration.ts # Application
```