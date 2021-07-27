'use strict'

// export
;['env', 'npm', 'spinner', 'log'].forEach((m) => {
  exports[m] = require(`./lib/${m}`)
})

exports.semver = require('semver')
exports.chalk = require('chalk')
exports.fs = require('fs-extra')
exports.inquirer = require('inquirer')
exports.execa = require('execa')

/**
 * exit
 */
exports.exit = function(exitCode) {
  if (exitCode === 0) {
    throw new Error(`Process exited with code ${exitCode}`)
  } else {
    process.exit(exitCode)
  }
}
