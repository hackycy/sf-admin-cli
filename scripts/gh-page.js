'use strict'

const { log } = require('./utils')
const execa = require('execa')
const fs = require('fs-extra')
const path = require('path')

const TEMP_DIR_PATH = path.resolve(__dirname, '../', 'temp')
const GH_PAGE_BRANCH = 'gh-page'
const GH_PAGE_DIR = path.join(TEMP_DIR_PATH, GH_PAGE_BRANCH)
const DOCS_DIST_PATH = path.resolve(__dirname, '../', 'docs', '.vuepress', 'dist')

/**
 * 文档上传至gh-page分支
 */
async function checkoutghpage() {
  log.info('gh-page', '清理旧构建...')
  await execa('npm', ['run', 'clean'], { stdio: 'inherit' })

  log.info('gh-page', '开始执行文档构建...')
  await execa('npm', ['run', 'docs:build'], { stdio: 'inherit' })

  // 临时文件夹
  fs.ensureDirSync(TEMP_DIR_PATH)
  fs.emptyDirSync(TEMP_DIR_PATH)

  // git clone
  log.info('git', '执行git clone...')
  await execa(
    'git',
    [
      'clone',
      '-b',
      GH_PAGE_BRANCH,
      'https://github.com/hackycy/sf-admin-cli.git',
      GH_PAGE_BRANCH
    ],
    { cwd: TEMP_DIR_PATH, stdio: 'inherit' }
  )
  
  log.info('gh-page', '清理原工作空间...')
  const originDirList = fs.readdirSync(GH_PAGE_DIR)
  for (let i = 0; i < originDirList.length; i++) {
    if (!originDirList[i] === '.git') {
      fs.removeSync(path.join(GH_PAGE_DIR, originDirList[i]))
    }
  }

  log.info('gh-page', '拷贝构建目录...')
  fs.moveSync(DOCS_DIST_PATH, GH_PAGE_DIR, { overwrite: true })

  log.info('git', '提交中...')
  const options = { stdio: 'inherit', cwd: GH_PAGE_DIR }
  await execa('git', ['add', '-A'], options)
  await execa('git', ['commit', '-m', 'update docs', '--no-verify'], options)
  await execa('git', ['push', '-u', '-f'], options)
  log.info('git', '文档已更新...')

  log.info('gh-page', '清理构建...')
  await execa('npm', ['run', 'clean'], options)
}

checkoutghpage().catch((err) => {
  log.error('gh-page', err)
  process.exit(1)
})