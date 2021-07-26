'use strict'

const { log } = require('@sfadminltd/utils')

async function create() {
  log.clearConsole()
}

module.exports = (...args) => {
  return create(...args).catch(() => {})
}
