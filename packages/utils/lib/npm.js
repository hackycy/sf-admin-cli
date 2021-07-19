'use strict'

const request = require('axios')

/**
 * 获取远程仓库中最新的版本号
 */
async function getPackageLastVersion(packageName, shouldUseTaobao) {
  const { data } = await request.get(`${getDefaultRegistry(shouldUseTaobao)}/${packageName}`)
  const versions = Object.keys(data.versions)
  console.log(versions)
}

/**
 * 获取默认配置源
 * @param {boolean} shouldUseTaobao 
 * @returns 
 */
function getDefaultRegistry(shouldUseTaobao = false) {
  return shouldUseTaobao ? 'https://registry.npm.taobao.org' : 'https://registry.npmjs.org'
}

module.exports = {
  getPackageLastVersion,
  getDefaultRegistry
}