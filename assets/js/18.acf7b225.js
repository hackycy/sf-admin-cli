(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{386:function(t,s,a){"use strict";a.r(s);var n=a(45),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"快速体验"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#快速体验"}},[t._v("#")]),t._v(" 快速体验")]),t._v(" "),a("p",[t._v("快速体验需要本地已经安装"),a("a",{attrs:{href:"http://docker.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Docker"),a("OutboundLink")],1),t._v("以及"),a("a",{attrs:{href:"https://docs.docker.com/compose/",target:"_blank",rel:"noopener noreferrer"}},[t._v("Docker-Compose"),a("OutboundLink")],1)]),t._v(" "),a("p",[t._v("在任意目录下创建一个"),a("code",[t._v("docker-compose.yml")]),t._v("文件，同时拷贝出选择的"),a("a",{attrs:{href:"https://github.com/hackycy/sf-nest-admin",target:"_blank",rel:"noopener noreferrer"}},[t._v("Nest"),a("OutboundLink")],1),t._v("或者"),a("a",{attrs:{href:"https://github.com/hackycy/sf-midway-admin",target:"_blank",rel:"noopener noreferrer"}},[t._v("Midway"),a("OutboundLink")],1),t._v("仓库下的sql脚本至当前目录，以Nest版为例")]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("version")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"3.0"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("services")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("db")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" mysql"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("5.7.34\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("default"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("authentication"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("plugin=mysql_native_password\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" sfadmin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/var/lib/mysql/ "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 配置数据卷")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" ./sql/"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("/docker"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("entrypoint"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("initdb.d/ "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 初始化的脚本，在sf-nest-admin开源仓库下的sql目录，拷贝至当前目录，手动使用脚手架导入也可")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 3306"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3306")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("TZ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Asia/Shanghai\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_ROOT_PASSWORD")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123456")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_DATABASE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" sf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("admin\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_USER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" sf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("admin\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_PASSWORD")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123456")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("redis")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" redis"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("alpine\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("command")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v('requirepass "123456"\n    '),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 6379"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6379")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("TZ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Asia/Shanghai\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("sfserver")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" qa894178522/sfnestadmin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("stable "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# midway请使用 qa894178522/sfvueadmin:stable")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("depends_on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" db\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" redis\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_HOST")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" db\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_PORT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3306")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_USERNAME")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" sf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("admin\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_PASSWORD")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123456")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MYSQL_DATABASE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" sf"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("admin\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("REDIS_HOST")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" redis\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("REDIS_PORT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6379")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("REDIS_PASSWORD")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("123456")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# nest可选")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MAILER_HOST")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MAILER_PORT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MAILER_USER")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("MAILER_PASS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("AMAP_KEY")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("QINIU_ACCESSKEY")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("QINIU_SECRETKEY")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("QINIU_DOMAIN")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("QINIU_BUCKET")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("QINIU_ZONE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" xxx "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Zone_as0 | Zone_na0 | Zone_z0 | Zone_z1 | Zone_z2")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("QINIU_ACCESS_TYPE")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" public "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# or private")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("sfvue")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("image")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" qa894178522/sfvueadmin"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("nest "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# midway请使用 qa894178522/sfvueadmin:midway")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("restart")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" always\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("environment")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("TZ")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" Asia/Shanghai\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("depends_on")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" sfserver\n    "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("ports")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v(" 7002"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("80")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 7002 本地运行的映射端口")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("volumes")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token key atrule"}},[t._v("sfadmin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 与上述配置对应")]),t._v("\n")])])]),a("p",[t._v("示例：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("$ "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("pwd")]),t._v("\n/Users/xxx/WorkPlace/vscode/temp\n$ "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("find")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v(" -print "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("sed")]),t._v(" -e "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'s;[^/]*/;|─;g;s;─|; |;g'")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("─docker-compose.yml\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("─sql\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("─upgrade_20210508.sql\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),t._v("─init.sql\n")])])]),a("p",[t._v("体验基础功能无需配置可选的配置。配置完毕后运行：")]),t._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[t._v("docker-compose -f "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"docker-compose.yml"')]),t._v(" up -d --build\n")])])]),a("p",[t._v("等待执行完成后，浏览器打开"),a("code",[t._v("http://localhost:7002/")]),t._v("即可体验")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("提示")]),t._v(" "),a("p",[t._v("超级管理员账号：rootadmin，密码：123456")]),t._v(" "),a("p",[a("strong",[t._v("后端Nest版docker下的image：")]),a("br"),t._v("\nsfserver：qa894178522/sfnestadmin:stable"),a("br"),t._v("sfvue：qa894178522/sfvueadmin:nest")]),t._v(" "),a("p",[a("strong",[t._v("后端Midway版docker下的iamge：")]),a("br"),t._v("\nsfserver：qa894178522/sfmidwayadmin:stable"),a("br"),t._v("sfvue：qa894178522/sfvueadmin:midway")])])])}),[],!1,null,null,null);s.default=e.exports}}]);