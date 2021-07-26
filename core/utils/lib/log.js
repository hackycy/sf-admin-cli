'use strict'

const log = require('npmlog')
const readline = require('readline')
const chalk = require('chalk')

log.heading = 'SF-ADMIN-CLI'

/**
 * 开启debug调试模式
 * @param {boolean} bool 
 */
log.openDebugMode = function (bool = false) {
  if (bool) {
    log.level = 'verbose'
  } else {
    log.level = 'info'
  }
  // set env
  process.env.SF_CLI_DEBUG = bool
}

log.clearConsole = function (title) {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    console.log(chalk.bold.blue(`SF ADMIN CLI v${process.env.SF_CLI_VERSION}`))
    if (title) {
      console.log(title)
    }
  }
}

module.exports = log