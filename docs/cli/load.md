# load

快速将指定文件夹中的所有`.sql`文件导入至`MySQL`。`MySQL`版本需在5.7以上。

``` bash
sfadmin load [options]
```

## 选项

| 选项                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `--username <username>`  | 必选参数，指定连接`MySQL`中的用户名，注意需要有建数据库的权限。开发下建议直接指定`root`。别名：`-u` |
| `--password <password>`  | 必选参数，指定连接`MySQL`中的用户名密码。别名：`-p`          |
| `--eval-dir [dir]`       | 指定`sql`脚本文件夹，请填写相对路径。默认为当前执行路径下的`sql`目录。别名：`-e` |
| `--host [host]`          | 指定`MySQL`的host或者ip地址，默认为`localhost`。别名：`-a`   |
| `--port [port]`          | 指定`MySQL`端口，默认为3306。别名：`-t`                      |
| `--database-name [name]` | 指定数据库名称，默认为`sf-admin`。别名：`-b`                 |
| `--overwrite`            | 覆盖已存在的数据库（该参数会删除指定的数据库）。别名：`-o`   |
| `--sql-debug`            | 开启`mysql`的debug模式，会有更多的日志输出。                 |

