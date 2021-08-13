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
│   └── permission.js          # 权限管理
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

那么在新增`api`同时，就要在`src/core/permission/modules`下根据模块进行定义`api`的path。例如：

```  javascript
/**
 * src/core/permission/modules/sys/menu.js
 * 菜单模块 
 */
export default {
  list: 'sys/menu/list',
  add: 'sys/menu/add',
  update: 'sys/menu/update',
  info: 'sys/menu/info',
  delete: 'sys/menu/delete'
}


/**
 * src/api/sys/menu.js
 * 菜单api定义示例
 */
import request from '@/utils/request'
import MenuApi from '@/core/permission/modules/sys/menu'

export function getMenuList() {
  return request({
    url: MenuApi.list,
    method: 'get'
  })
}

export function getMenuInfo(query) {
  return request({
    url: MenuApi.info,
    method: 'get',
    params: query
  })
}

export function createMenu(data) {
  return request({
    url: MenuApi.add,
    method: 'post',
    data
  })
}
```

在页面下使用：

``` html
<el-link
  :disabled="scope.row.type === 'file' && !$auth('netdiskManage.info')"
  :underline="false"
  @click="handleClickFileItem(scope.row)" />
```

如示例中的：`$auth('netdiskManage.info')`，该结果会进行返回`true`或`false`，真即为具有该按钮权限。

而`netdiskManage.info`这个值是根据你在`src/core/permission/modules`下的定义进行区分的。

::: tip 提示
其他示例：
- 'src/core/permission/modules/app.js' => 'app'
- 'src/core/permission/modules/sys/app.js' => 'sysApp'
- 'src/core/permission/modules/netdisk/manage.js' => 'netdiskManage'
:::

`info`值则是对应`js` `export default`导出的对象`key`。具体实现请查看[src/core/permission/index.js](https://github.com/hackycy/sf-vue-admin/blob/dev/src/core/permission/index.js)