'use strict'

// export
;['env', 'npm', 'spinner', 'log'].forEach((m) => {
  exports[m] = require(`./lib/${m}`)
})

exports.semver = require('semver')
exports.chalk = require('chalk')
exports.fs = require('fs-extra')
