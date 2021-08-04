'use strict'

const { log } = require('./utils')
const path = require('path')
const fs = require('fs-extra')
const chalk = require('chalk')

/**
 * 清理临时目录
 */
async function clean() {
  const tempDirPath = path.resolve(__dirname, '../', 'temp')
  log.info('clean', `正在清理目录：${chalk.yellow(tempDirPath)}`)
  await fs.remove(tempDirPath)

  const docsDistPath = path.resolve(__dirname, '../', 'docs', '.vuepress', 'dist')
  log.info('clean', `正在清理目录：${chalk.yellow(docsDistPath)}`)
  await fs.remove(docsDistPath)
}

clean().catch(e => {
  log.error(e)
  process.exit(1)
})