'use strict'

const { log } = require('./utils')
const path = require('path')
const fs = require('fs-extra')

/**
 * 清理临时目录
 */
async function clean() {
  const tempDirPath = path.resolve(__dirname, '../', 'temp')
  // clean
  log.info(`正在清理目录：${tempDirPath}`)
  await fs.remove(tempDirPath)
}

clean().catch(e => {
  log.error(e)
  process.exit(1)
})