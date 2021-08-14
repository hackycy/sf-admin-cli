'use strict'

const { log } = require('./utils')
const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

// package文件夹
const MODULES = ['commands', 'core']

/**
 * 同步生成package下的README
 */
async function genReadme() {
  const ROOT_README = fs.readFileSync(path.resolve(__dirname, '..', 'README.md'))

  for (let i = 0; i < MODULES.length; i++) {
    const moduleChildDir = path.resolve(__dirname, '..', MODULES[i])
    const pkgNames = fs.readdirSync(moduleChildDir)
    for (let j = 0; j < pkgNames.length; j++) {
      const pkgDir = path.resolve(moduleChildDir, pkgNames[j])
      fs.writeFileSync(path.join(pkgDir, 'README.md'), ROOT_README)
      log.info('gen-md', `已生成${chalk.yellow(pkgDir)}下的README.md文档`)
    }
  }
}

genReadme().catch(err => {
  log.error('gh-page', err)
  process.exit(1)
})