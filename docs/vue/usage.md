# 快速上手

该文已假定你对该 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide) 项目已有一定的了解。如若不然，请先去阅读 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/guide) 文档。

## 目录结构

``` bash
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── config                 # 项目配置
│   ├── icons                  # 项目所有 svg icons
│   ├── core                   # 后台核心模块类、指令等定义
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── styles                 # 全局样式
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   ├── views                  # views 所有页面
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json 
```

## 页面级别的权限验证

新增页面在`@/views`文件下 创建对应的文件夹，一般一个路由对应一个文件，该模块下的功能组件或者方法就建议在本文件夹下创建一个`utils`或`components`文件夹，各个功能模块维护自己的`utils`或`components`组件。如：

![](./screenshot/add_view_1.png)

纯静态路由的定义在`src/config/router.config.js`文件中定义，但是如果需要区分**权限路由**时，请不要直接定义。

按照您的业务模块划分，在`src/router/modules`下进行路由页面映射。例如内置系统模块定义如下：

``` javascript
/**
 * src/router/modules/system.js
 * 
 * 系统模块
 */
export default {
  'views/system/permission/menu': () => import('@/views/system/permission/menu'),
  'views/system/permission/user': () => import('@/views/system/permission/user'),
  'views/system/permission/role': () => import('@/views/system/permission/role'),
  'views/system/monitor/req-log': () => import('@/views/system/monitor/req-log'),
  'views/system/monitor/online': () => import('@/views/system/monitor/online'),
  'views/system/monitor/login-log': () => import('@/views/system/monitor/login-log'),
  'views/system/schedule/task': () => import('@/views/system/schedule/task'),
  'views/system/schedule/log': () => import('@/views/system/schedule/log')
}
```

定义好后在页面中进行新增页面即可

![](./screenshot/add_view_2.png)

## 按钮级别的权限验证

新增`api`直接按照规范在`src/api`目录下进行新增模块对应的api服务。但是对于部分页面按钮是需要区分权限的，即无权限时会显示禁用状态。

![](./screenshot/add_api_1.png)

以及在新增权限时的自动选择提示：

![](./screenshot/add_api_2.png)

那么在新增`api`同时，则新增后缀为`.class.js`后缀的文件定义，并且以`export default`导出类定义，例如：

```  javascript
/**
 * src/api/sys/dept.class.js
 */
import request from '@/utils/request'
import { PermissionAction, PermissionPrefix } from '@/core/permission/decorator'

@PermissionPrefix('sys/dept')
class SysDept {
  @PermissionAction()
  list() {
    return request({
      url: 'sys/dept/list',
      method: 'get'
    })
  }

  @PermissionAction()
  move(data) {
    return request({
      url: 'sys/dept/move',
      method: 'post',
      data
    })
  }

  // ... 后面省略
}

export default SysDept
```

使用`@PermissionPrefix`以及`@PermissionAction`装饰器进行定义权限，例如上述例子中，会被自动分析成`sys:dept:list`、`sys:dept:move`，并且在`api`文件夹下定义的`.class.js`后缀的文件会被自动实例化并挂载到`Vue`实例上。


页面下需要调用api时则直接使用`vm.$api.sys.dept.list()`即可访问接口， 例如：

``` js
async getConfigList({ page, limit }) {
    const { data } = await this.$api.sys.paramConfig.page({ page, limit })
    return data
}
```


::: tip 提示
其他示例：
- 'src/core/permission/modules/app.js' => 'app'
- 'src/api/sys/param-config.js' => 'sys.paramConfig'
- 'src/api/netdisk/manage.js' => 'netdisk.manage'
:::