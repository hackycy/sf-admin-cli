# 介绍

![](https://img.shields.io/github/commit-activity/m/hackycy/sf-nest-admin) ![](https://img.shields.io/github/license/hackycy/sf-nest-admin) ![](https://img.shields.io/github/repo-size/hackycy/sf-nest-admin) ![](https://img.shields.io/github/languages/top/hackycy/sf-nest-admin)

**基于NestJs + TypeScript + TypeORM + Redis + MySql + Vue + Element-UI编写的一款简单高效的前后端分离的权限管理系统。具有：**

- 前后端请求参数校验
- JWT 认证
- 基于 NestJs 框架，内置了基础的中间件支持（用户认证、访问日志、请求追踪等）
- 用户权限动态刷新
- 代码简单，结构清晰

::: tip 环境要求
- Node.js 12.x+
- Typescript 2.8+
- MYSQL 5.7+
- Redis 5.0+
:::

## 演示地址

- [http://opensource.admin.si-yee.com](http://opensource.admin.si-yee.com/)
- [Swagger Api文档](http://opensource.admin.si-yee.com/api/doc/admin/swagger-api/static/index.html)

演示环境账号密码：

|     账号     |  密码  |           权限           |
| :----------: | :----: | :----------------------: |
|  openadmin   | 123456 | 仅只有各个功能的查询权限 |
| monitoradmin | 123456 |  系统监控页面及按钮权限  |

> 所有新建的用户初始密码都为123456

本地部署账号密码：

|   账号    |  密码  |    权限    |
| :-------: | :----: | :--------: |
| rootadmin | 123456 | 超级管理员 |

## 模块列表

``` bash
├─系统管理
│  ├─用户管理
│  ├─角色管理
│  ├─菜单管理
├─系统监控
│  ├─在线用户
│  ├─登录日志
│  ├─请求追踪
├─任务调度
│  ├─定时任务
│  └─任务日志
├─网盘空间
│  ├─空间管理
│  └─空间概览
```

## 技术选型

### 后端

- NestJs + TypeScript
- TypeORM（MYSQL）
- ioredis（Redis）
- bull（队列）

### 前端

- Vue、Vue-Router、VueX
- Element-UI