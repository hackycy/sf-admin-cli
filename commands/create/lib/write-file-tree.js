'use strict'

const { fs } = require('@sfadminltd/utils')
const path = require('path')

module.exports = function writeFileTree(dir, files) {
  if (!files) {
    return
  }
  // remove exist
  Object.keys(files).forEach(name => {
    const filePath = path.join(dir, name)
    fs.ensureDirSync(path.dirname(filePath))

    // pre delete
    fs.removeSync(filePath)

    // write
    fs.writeFileSync(filePath, files[name])
  })
}