(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{392:function(s,t,a){"use strict";a.r(t);var r=a(45),e=Object(r.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"快速上手"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速上手"}},[s._v("#")]),s._v(" 快速上手")]),s._v(" "),a("h2",{attrs:{id:"项目初始化"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#项目初始化"}},[s._v("#")]),s._v(" 项目初始化")]),s._v(" "),a("p",[s._v("使用脚手架 "),a("RouterLink",{attrs:{to:"/cli/"}},[s._v("@sfadminltd/cli")]),s._v(" 创建一个标准的Nest项目：")],1),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("sfadmin create my-project\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),a("p",[s._v("请根据提示选择 "),a("strong",[s._v("nest")]),s._v(" 模板")])]),s._v(" "),a("p",[s._v("待脚手架创建项目完毕后，进入"),a("code",[s._v("my-project")]),s._v("目录，会有一个"),a("code",[s._v("server")]),s._v("和"),a("code",[s._v("vue")]),s._v("文件夹，分别是后端代码以及前端代码。")]),s._v(" "),a("h2",{attrs:{id:"导入脚本"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#导入脚本"}},[s._v("#")]),s._v(" 导入脚本")]),s._v(" "),a("p",[s._v("命令行进入到创建好的后端目录"),a("code",[s._v("my-project/server")]),s._v("后，执行脚手架"),a("code",[s._v("load")]),s._v("命令导入sql脚本，所有的脚本都位于"),a("code",[s._v("sql")]),s._v("目录")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[s._v("$ sfadmin load -e ./sql -u root -p "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("123456")]),s._v(" -t "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3306")]),s._v(" -a localhost -b my-admin -o\nSF-ADMIN-CLI info load Trying to connect"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("..")]),s._v(".\nSF-ADMIN-CLI info load Connection succeeded\nSF-ADMIN-CLI notice load importing sql: my-project/server/sql/init.sql\nSF-ADMIN-CLI notice load importing sql: my-project/server/sql/upgrade_20210508.sql\nSF-ADMIN-CLI info load "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("import")]),s._v(" sql "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("done")]),s._v("\n┌─────────┬───────────────────────┐\n│ "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("index"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" │  Tables_in_my-admin   │\n├─────────┼───────────────────────┤\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v("    │   "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_department'")]),s._v("    │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v("    │    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_login_log'")]),s._v("    │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v("    │      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_menu'")]),s._v("       │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v("    │     "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_req_log'")]),s._v("     │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("4")]),s._v("    │      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_role'")]),s._v("       │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),s._v("    │ "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_role_department'")]),s._v(" │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("6")]),s._v("    │    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_role_menu'")]),s._v("    │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("7")]),s._v("    │      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_task'")]),s._v("       │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("8")]),s._v("    │    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_task_log'")]),s._v("     │\n│    "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("9")]),s._v("    │      "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_user'")]),s._v("       │\n│   "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),s._v("    │    "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'sys_user_role'")]),s._v("    │\n└─────────┴───────────────────────┘\n")])])]),a("blockquote",[a("p",[s._v("示例下的命令参数具体含义请查看"),a("RouterLink",{attrs:{to:"/cli/"}},[s._v("CLI教程")])],1)]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),a("p",[s._v("这里需要你提前准备好MySQL环境\n"),a("br"),s._v("\n也可以不使用脚手架进行导入，可自行手动创建数据库及导入脚本")])]),s._v(" "),a("h2",{attrs:{id:"修改开发配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#修改开发配置"}},[s._v("#")]),s._v(" 修改开发配置")]),s._v(" "),a("p",[s._v("基于"),a("a",{attrs:{href:"https://docs.nestjs.com/techniques/configuration#configuration",target:"_blank",rel:"noopener noreferrer"}},[s._v("@nestjs/config"),a("OutboundLink")],1),s._v("，后端文件配置在后端目录下的"),a("code",[s._v("src/config")])]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─config.production.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─config.default.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 默认配置，会被各环境下的配置进行合并覆盖，通用配置可定义在该文件下")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─defineConfig.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─config.development.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─configuration.ts\n")])])]),a("p",[s._v("开发环境下请修改"),a("code",[s._v("config.development.ts")]),s._v("，生产环境下修改"),a("code",[s._v("config.production.ts")]),s._v("。具体配置含义请查看"),a("code",[s._v("configuration.ts")]),s._v("定义的"),a("code",[s._v("IConfig")]),s._v("。")]),s._v(" "),a("p",[s._v("文件下的"),a("code",[s._v("config.${env}.ts")]),s._v("中的"),a("code",[s._v("${env}")]),s._v("由"),a("code",[s._v("process.env.NODE_ENV")]),s._v("变量决定。可根据自己的需求自行变更。")]),s._v(" "),a("h2",{attrs:{id:"运行"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运行"}},[s._v("#")]),s._v(" 运行")]),s._v(" "),a("p",[s._v("分别进入后端目录及前端目录，运行"),a("code",[s._v("npm run dev")]),s._v("即可")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# server")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" server\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run dev\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# vue")]),s._v("\n$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" vue\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("npm")]),s._v(" run dev\n")])])]),a("p",[s._v("运行后即可访问： "),a("a",{attrs:{href:"http://localhost:9528/",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://localhost:9528/"),a("OutboundLink")],1)]),s._v(" "),a("h2",{attrs:{id:"目录结构说明"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#目录结构说明"}},[s._v("#")]),s._v(" 目录结构说明")]),s._v(" "),a("p",[s._v("后端"),a("code",[s._v("src")]),s._v("目录结构：")]),s._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─setup-swagger.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Swaager文档配置")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─polyfill.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# polifill")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─main.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 主入口")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─config "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 配置文件")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─config.production.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─config.default.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─defineConfig.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─config.development.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─configuration.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─shared\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─redis "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# redisModule ")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─redis.module.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─redis.interface.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─redis.constants.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─shared.module.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─services "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 全局通用Provider")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─app.module.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─mission\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─mission.module.ts\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─mission.decorator.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 任务装饰器，所有任务都需要定义该装饰器，否则无法运行")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─jobs "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 后台定时任务定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─common "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 系统通用定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─dto "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通用DTO定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─contants\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─error-code.contants.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 系统错误码定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─decorator.contants.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 装饰器常量")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─filters "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通用过滤器定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─interceptors "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通用拦截器定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─decorators "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 通用装饰器定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─exceptions "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 系统内置通用异常定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─class "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Class Model 不使用Interface定义，使用Interface无法让Swagger识别")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─modules\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─admin\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─core "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 核心功能")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─interceptors "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 后台管理拦截器定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─decorators "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 后台管理注解定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─provider "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 后台管理提供者定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─guards "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 后台管理守卫定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─netdisk "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 网盘管理模块定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─system "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 系统模块定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─account "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 用户账户模块定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─login "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 登录模块定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─admin.module.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 后台管理模块")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─admin.constants.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# 后台管理模块通用常量")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─admin.interface.ts "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Admin通用interface定义")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─ws "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Socket模块")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v("─entities "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# TypeORM 实体文件定义")]),s._v("\n")])])]),a("h2",{attrs:{id:"日志"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#日志"}},[s._v("#")]),s._v(" 日志")]),s._v(" "),a("p",[s._v("该系统基于"),a("a",{attrs:{href:"https://github.com/winstonjs/winston",target:"_blank",rel:"noopener noreferrer"}},[s._v("Winston"),a("OutboundLink")],1),s._v("自定义了一套日志模块，根据配置文件进行调整日志输出等级，分为控制台、文件输出。")]),s._v(" "),a("p",[s._v("请使用"),a("code",[s._v("src/shared/logger/logger.service.ts")]),s._v("下的"),a("code",[s._v("LoggerService")]),s._v("进行日志输出调试，输出等级有如下：")]),s._v(" "),a("ul",[a("li",[s._v("debug: 4")]),s._v(" "),a("li",[s._v("verbose: 3")]),s._v(" "),a("li",[s._v("info: 2")]),s._v(" "),a("li",[s._v("warn: 1")]),s._v(" "),a("li",[s._v("error: 0")])]),s._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[s._v("注意")]),s._v(" "),a("p",[s._v("默认的控制台输出等级为"),a("code",[s._v("info")]),s._v("，生产环境下默认不允许控制台进行输出，文件输出等级默认为"),a("code",[s._v("warn")]),s._v("。日志默认为当前项目路径下的"),a("code",[s._v("logs")]),s._v("目录，也可自行配置。")]),s._v(" "),a("p",[s._v("默认"),a("code",[s._v("TypeORM")]),s._v("也使用了"),a("code",[s._v("LoggerService")]),s._v("进行日志输出。")])])])}),[],!1,null,null,null);t.default=e.exports}}]);