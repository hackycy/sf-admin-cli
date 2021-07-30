'use strict'

const { readPackageSync } = require('read-pkg')
const fs = require('fs')
const path = require('path')

exports.resolvePkg = function(cwd) {
  if (fs.existsSync(path.join(cwd, 'package.json'))) {
    return readPackageSync({ cwd })
  }
  return {}
}