'use strict'

const log = require('npmlog')

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

module.exports = log