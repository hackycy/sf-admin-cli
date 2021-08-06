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
$ sfadmin load 
```

::: tip 注意
这里需要你提前准备好MySQL环境
<br />
也可以不使用脚手架进行导入，可自行手动创建数据库及导入脚本
:::



