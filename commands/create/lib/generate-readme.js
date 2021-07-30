'use strict'

/**
 * generate readme
 * @param {server|vue} type
 * @returns readme string
 */
module.exports = function generateReadme(type, name, packageManager) {
  return [
    `# ${name}-${type}\n`,
    '## 项目初始化',
    '```',
    `${packageManager} install`,
    '```',
    '',
    ...(type === 'server'
      ? [
          '## 系统配置\n',
          '### 管理员账号密码\n',
          '|   账号    |  密码  |    权限    |',
          '| :-------: | :----: | :--------: |',
          '| rootadmin | 123456 | 超级管理员 |',
          '',
          '### 初始化数据库\n',
          '手动导入sql文件下的所有sql文件',
          '',
          '### 更改开发环境配置\n',
          '修改对应运行环境下的配置文件`config.${env}.ts`',
          ''
        ]
      : []),
    '## 运行项目',
    '```',
    `${packageManager} ${packageManager !== 'yarn' ? 'run ' : ''}dev`,
    '```',
    '# 版权声明\n',
    '> 请尊重原创，原项目遵循GNU General Public License v3.0协议',
    '> 原项目链接：',
    '> - [sf-midway-admin](https://github.com/hackycy/sf-midway-admin)',
    '> - [sf-nest-admin](https://github.com/hackycy/sf-nest-admin)',
    '> - [sf-vue-admin](https://github.com/hackycy/sf-vue-admin)'
  ].join('\n')
}
