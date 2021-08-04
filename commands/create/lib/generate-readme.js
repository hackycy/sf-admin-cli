'use strict'

/**
 * generate readme
 * @param {server|vue} type
 * @returns readme string
 */
module.exports = function generateReadme(type, name, packageManager) {
  return [
    `# ${name}-${type}`,
    '',
    '** 使用文档: ** https://blog.si-yee.com/sf-admin-cli/',
    '',
    '## 项目初始化',
    '```',
    `${packageManager} install`,
    '```',
    '',
    '## 运行项目',
    '```',
    `${packageManager} ${packageManager !== 'yarn' ? 'run ' : ''}dev`,
    '```',
    '',
    '# 版权声明',
    '',
    '> 请尊重原创，项目遵循 **MIT协议**'
  ].join('\n')
}
