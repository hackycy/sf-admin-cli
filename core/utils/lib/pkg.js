'use strict'

const readPkg = require('read-pkg')
const fs = require('fs')
const path = require('path')

exports.resolvePkg = function(cwd) {
  if (fs.existsSync(path.join(cwd, 'package.json'))) {
    return readPkg.sync({ cwd })
  }
  return {}
}