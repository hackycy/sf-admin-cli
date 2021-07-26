'use strict'

const { checkVersion } = require('./check-version')

async function create(projectName, options, context) {
  // 检查更新
  await checkVersion(context.version, context.name, options.taobao)
}

module.exports = (...args) => {
  return create(...args).catch(() => {})
}
