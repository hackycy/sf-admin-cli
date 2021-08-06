# info

输出当前环境、指定依赖的信息

``` bash
sfadmin info [options]
```

## 选项

| 选项                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `--dep [deps...]`  | 指定需要搜索的当前路径下的package.json依赖 |

## 示例

``` bash
____  _____ _    ____  __  __ ___ _   _ 
/ ___||  ___/ \  |  _ \|  \/  |_ _| \ | |
\___ \| |_ / _ \ | | | | |\/| || ||  \| |
 ___) |  _/ ___ \| |_| | |  | || || |\  |
|____/|_|/_/   \_|____/|_|  |_|___|_| \_|


Environment Info:

  System:
    OS: macOS 11.2.3
    CPU: (12) x64 Intel(R) Core(TM) i7-8850H CPU @ 2.60GHz
  Binaries:
    Node: 14.15.0 - /usr/local/bin/node
    Yarn: 1.22.10 - /usr/local/bin/yarn
    npm: 7.20.3 - /usr/local/bin/npm
  npmGlobalPackages:
    @nestjs/cli: 8.1.1
    @sfadminltd/cli: 0.0.8
    @vue/cli: 4.5.4
```
