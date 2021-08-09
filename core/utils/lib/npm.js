'use strict'

const request = require('axios')
const semver = require('semver')
const execa = require('execa')
const { hasYarn } = require('./env')

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
    .sort((v1, v2) => {
      if (semver.lt(v1, v2)) return 1
      else return -1
    })
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

/**
 * get global install command
 * npm i -g / yarn global add
 */
function getGlobalInstallCommand() {
  if (hasYarn()) {
    const { stdout: yarnGlobalDir } = execa.sync('yarn', ['global', 'dir'])
    if (__dirname.includes(yarnGlobalDir)) {
      return 'yarn global add'
    } 
  }
  const { stdout: npmGlobalPrefix } = execa.sync('npm', ['config', 'get', 'prefix'])
  if (__dirname.includes(npmGlobalPrefix)) {
    return 'npm i -g'
  }
}

module.exports = {
  getPackageLastVersion,
  getDefaultRegistry,
  getGlobalInstallCommand
}
