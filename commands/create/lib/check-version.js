'use strict'

const { log, npm, spinner, chalk, semver } = require('@sfadminltd/utils')

/**
 * 检查当前脚手架版本号
 */
async function checkVersion(installedVersion, id, shouldUseTaobao) {
  let title = ''

  spinner.logWithSpinner('Loading...\n')

  try {
    // 获取远程npm仓库版本
    const version = await npm.getPackageLastVersion(
      id,
      installedVersion,
      shouldUseTaobao
    )
    spinner.stopSpinner(false)
    log.verbose(
      `Remote last npm version：${version}，current installed version：${installedVersion}`
    )
    
    // 如果已安装版本小于远程npm版本则提示更新
    if (semver.lt(installedVersion, version)) {
      let upgradeMessage = `New version available ${chalk.magenta(installedVersion)} → ${chalk.green(version)}`
      try {
        const command = npm.getGlobalInstallCommand()

        if (command) {
          upgradeMessage +=
            `\nRun ${chalk.yellow(`${command} ${id}`)} to update!`
        }
      } catch (e) {/* */}

      const upgradeBox = require('boxen')(upgradeMessage, {
        align: 'center',
        borderColor: 'green',
        dimBorder: true,
        padding: 1
      })

      title += `${upgradeBox}\n`
    }
  } catch (err) {
    spinner.stopSpinner(false)
    log.error(
      `Unable to get the latest version number of remote npm. err msg: ${err}`
    )
  }

  // clear console
  log.clearConsole(title)
}

exports.checkVersion = checkVersion
