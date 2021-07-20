'use strict'

const request = require('axios')
const semver = require('semver')

/**
 * 获取远程仓库中最新的版本号
 */
async function getPackageLastVersion(
  packageName,
  baseVersion,
  shouldUseTaobao
) {
  const { data } = await request.get(
    `${getDefaultRegistry(shouldUseTaobao)}/${packageName}`
  )
  // 过去基于BaseVersion以上的版本
  const versions = Object.keys(data.versions)
    .filter((v) => semver.satisfies(v, `>=${baseVersion}`))
    .sort((v1, v2) => semver.gt(v2, v1))
  return versions[0]
}

/**
 * 获取默认配置源
 * @param {boolean} shouldUseTaobao 是否使用淘宝镜像
 * @returns
 */
function getDefaultRegistry(shouldUseTaobao = false) {
  return shouldUseTaobao
    ? 'https://registry.npm.taobao.org'
    : 'https://registry.npmjs.org'
}

module.exports = {
  getPackageLastVersion,
  getDefaultRegistry
}
