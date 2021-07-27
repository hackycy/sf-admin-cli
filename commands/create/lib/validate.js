'use strict'

const vnpn = require('validate-npm-package-name')
const { exit, log, chalk } = require('@sfadminltd/utils')

exports.validateProjectName = function(name) {
  const result = vnpn(name)
  if (!result.validForNewPackages) {
    // 名称不合法
    log.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      log.error(chalk.red.dim(err))
    })
    result.warnings && result.warnings.forEach(warn => {
      log.warn(chalk.red.dim(warn))
    })
    exit(1)
  }
}