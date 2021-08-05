# 安装

::: tip Node 版本要求
SF ADMIN CLI 需要 [NodeJS](https://nodejs.org) v12 或 更高的版本。你可以使用 [n](https://github.com/tj/n)，[nvm](https://github.com/nvm-sh/nvm) 或 [nvm-windows](https://github.com/coreybutler/nvm-windows) 在同一台电脑中管理多个 Node 版本。
:::

可以使用下列任一命令安装这个新的包：

``` bash
npm install -g @sfadminltd/cli

# 或者

yarn global add @sfadminltd/cli
```

安装之后，你就可以在命令行中访问 `sfadmin` 命令。你可以通过简单运行 `sfadmin`，看看是否展示出了一份所有可用命令的帮助信息，来验证它是否安装成功。

你还可以用这个命令来检查其版本是否正确：

``` bash
sfadmin -v
```

查看帮助

``` bash
sfadmin -h

# 或者

sfadmin <command> -h
```

# 升级

如需升级全局的 Vue CLI 包，请运行：

``` bash
npm update -g @sfadminltd/cli

# 或者

yarn global upgrade --latest @sfadminltd/cli
```