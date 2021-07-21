'use strict'

const { log, npm, spinner, chalk, semver } = require('@sfadminltd/utils')

/**
 * 检查当前脚手架版本号
 */
 async function checkVersion(installedVersion, id) {
  spinner.logWithSpinner(`Fetching ${chalk.green(id)} remote lastest version`)
  // add \n
  console.log()
  // 获取远程npm仓库版本
  const version = await npm.getPackageLastVersion(id, installedVersion, process.env.SF_CLI_USE_TAOBAO_REGISTRY)
  spinner.stopSpinner(false)
  log.verbose(`remote last npm version：${version}，current installed version：${installedVersion}`)
  if (semver.lt(installedVersion, version)) {
    // 如果已安装版本小于远程npm版本则提示更新
    log.notice(`You can run ${chalk.green(`npm install -g ${id}`)} to update`)
  } else {
    log.info('Currently is the latest version')
  }
}



module.exports = (...args) => {
  return checkVersion(...args).catch((err) => {
    spinner.stopSpinner(false)
    log.error(`Unable to get the latest version number of remote npm. err msg: ${err}`)
  })
}
