# 快速体验

快速体验需要本地已经安装[Docker](http://docker.com/)以及[Docker-Compose](https://docs.docker.com/compose/)

在任意目录下创建一个`docker-compose.yml`文件，同时拷贝出选择的[Nest](https://github.com/hackycy/sf-nest-admin)或者[Midway](https://github.com/hackycy/sf-midway-admin)仓库下的sql脚本至当前目录，以Nest版为例

``` yml
version: "3.0"

services:

  db:
    image: mysql:5.7.34
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    volumes:
      - sfadmin:/var/lib/mysql/ # 配置数据卷
      - ./sql/:/docker-entrypoint-initdb.d/ # 初始化的脚本，在sf-nest-admin开源仓库下的sql目录，拷贝至当前目录，手动使用脚手架导入也可
    ports:
      - 3306:3306
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123456
      MYSQL_DATABASE: sf-admin
      MYSQL_USER: sf-admin
      MYSQL_PASSWORD: 123456

  redis:
    image: redis:alpine
    command: --requirepass "123456"
    restart: always
    ports:
      - 6379:6379
    environment:
      TZ: Asia/Shanghai

  sfserver:
    image: qa894178522/sfnestadmin:stable # midway请使用 qa894178522/sfvueadmin:stable
    restart: always
    depends_on:
      - db
      - redis
    environment:
      MYSQL_HOST: db
      MYSQL_PORT: 3306
      MYSQL_USERNAME: sf-admin
      MYSQL_PASSWORD: 123456
      MYSQL_DATABASE: sf-admin
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: 123456
      # nest可选
      MAILER_HOST: xxx
      MAILER_PORT: xxx
      MAILER_USER: xxx
      MAILER_PASS: xxx
      AMAP_KEY: xxx
      QINIU_ACCESSKEY: xxx
      QINIU_SECRETKEY: xxx
      QINIU_DOMAIN: xxx
      QINIU_BUCKET: xxx
      QINIU_ZONE: xxx # Zone_as0 | Zone_na0 | Zone_z0 | Zone_z1 | Zone_z2
      QINIU_ACCESS_TYPE: public # or private

  sfvue:
    image: qa894178522/sfvueadmin:nest # midway请使用 qa894178522/sfvueadmin:midway
    restart: always
    environment:
      TZ: Asia/Shanghai
    depends_on:
      - sfserver
    ports:
      - 7002:80 # 7002 本地运行的映射端口

volumes:
  sfadmin: # 与上述配置对应
```

示例：

``` bash
$ pwd
/Users/xxx/WorkPlace/vscode/temp
$ find . -print | sed -e 's;[^/]*/;|─;g;s;─|; |;g'
|─docker-compose.yml
|─sql
| |─upgrade_20210508.sql
| |─init.sql
```

体验基础功能无需配置可选的配置。配置完毕后运行：

``` bash
docker-compose -f "docker-compose.yml" up -d --build
```

等待执行完成后，浏览器打开`http://localhost:7002/`即可体验

::: tip 提示
超级管理员账号：rootadmin，密码：123456

**后端Nest版docker下的image：**<br />
sfserver：qa894178522/sfnestadmin:stable<br />sfvue：qa894178522/sfvueadmin:nest

**后端Midway版docker下的iamge：**<br />
sfserver：qa894178522/sfmidwayadmin:stable<br />sfvue：qa894178522/sfvueadmin:midway
:::