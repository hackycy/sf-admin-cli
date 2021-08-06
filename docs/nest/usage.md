# 使用教程

## 项目初始化

使用脚手架 [@sfadminltd/cli](/cli/) 创建一个标准的Nest项目：

``` bash
sfadmin create my-project
```

::: tip 注意
请根据提示选择 **nest** 模板
:::

待脚手架创建项目完毕后，进入`my-project`目录，会有一个`server`和`vue`文件夹，分别是后端代码以及前端代码。

## 导入脚本

命令行进入到创建好的后端目录`my-project/server`后，执行脚手架`load`命令导入sql脚本

``` bash
$ sfadmin load -e ./sql -u root -p 123456 -t 3306 -a localhost -b my-admin -o
SF-ADMIN-CLI info load Trying to connect...
SF-ADMIN-CLI info load Connection succeeded
SF-ADMIN-CLI notice load importing sql: my-project/server/sql/init.sql
SF-ADMIN-CLI notice load importing sql: my-project/server/sql/upgrade_20210508.sql
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
|─config.production.ts
|─config.default.ts # 默认配置，会被各环境下的配置进行合并覆盖，通用配置可定义在该文件下
|─defineConfig.ts
|─config.development.ts
|─configuration.ts
```

开发环境下请修改`config.development.ts`，生产环境下修改`config.production.ts`。具体配置含义请查看`configuration.ts`定义的`IConfig`。

文件下的`config.${env}.ts`中的`${env}`由`process.env.NODE_ENV`变量决定。可根据自己的需求自行变更。

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

后端目录结构：

``` bash
|─setup-swagger.ts # Swaager文档配置
|─polyfill.ts # polifill
|─main.ts # 主入口
|─config # 配置文件
| |─config.production.ts
| |─config.default.ts
| |─defineConfig.ts
| |─config.development.ts
| |─configuration.ts
|─shared
| |─redis # redisModule 
| | |─redis.module.ts
| | |─redis.interface.ts
| | |─redis.constants.ts
| |─shared.module.ts
| |─services # 全局通用Provider
|─app.module.ts
|─mission
| |─mission.module.ts
| |─mission.decorator.ts # 任务装饰器，所有任务都需要定义该装饰器，否则无法运行
| |─jobs # 后台定时任务定义
|─common # 系统通用定义
| |─dto # 通用DTO定义
| |─contants
| | |─error-code.contants.ts # 系统错误码定义
| | |─decorator.contants.ts # 装饰器常量
| |─filters # 通用过滤器定义
| |─interceptors # 通用拦截器定义
| |─decorators # 通用装饰器定义
| |─exceptions # 系统内置通用异常定义
| |─class # Class Model 不使用Interface定义，使用Interface无法让Swagger识别
|─modules
| |─admin
| | |─core # 核心功能
| | | |─interceptors # 后台管理拦截器定义
| | | |─decorators # 后台管理注解定义
| | | |─provider # 后台管理提供者定义
| | | |─guards # 后台管理守卫定义
| | |─netdisk # 网盘管理模块定义
| | |─system # 系统模块定义
| | |─account # 用户账户模块定义
| | |─login # 登录模块定义
| | |─admin.module.ts # 后台管理模块
| | |─admin.constants.ts # 后台管理模块通用常量
| | |─admin.interface.ts # Admin通用interface定义
| |─ws # Socket模块
|─entities # TypeORM 实体文件定义
```
