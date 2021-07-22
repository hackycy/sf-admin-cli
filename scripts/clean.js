'use strict'

const { log } = require('./utils')
const path = require('path')
const fs = require('fs-extra')

/**
 * 清理临时目录
 */
;(async () => {
  const tempDirPath = path.resolve(__dirname, '../temp')
  // clean
  log('开始清理临时文件夹目录')
  fs.removeSync(tempDirPath)
  log('已清理临时文件夹目录')  
})()