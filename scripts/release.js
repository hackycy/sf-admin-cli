'use strict'

const globby = require('globby')
const path = require('path')
const execa = require('execa')
const { log } = require('./utils')

/**
 * 版本发布
 */
async function release() {
  log.info('正在检查packages下的package.json配置...')
  const pkgs = await globby(['core/**/*/package.json', 'commands/**/*/package.json'], {
    deep: 2,
    gitignore: true
  })
  // 逐一检查配置
  for (let i = 0; i < pkgs.length; i ++) {
    // 检查package.json是否有publishConfig.access = "public" 配置
    const json = require(path.resolve(__dirname, '../', pkgs[i]))
    if (!json || !json.publishConfig || json.publishConfig.access !== 'public') {
      throw new Error(`当前 ${pkgs[i]} package publishConfig配置不正确`)
    }
  }
  log.info('正在清除packages下的package-lock.json文件')
  await execa('npm', ['run', 'prepublish'])

  log.info('执行lerna publish')
  await execa(require.resolve('lerna/cli'), ['publish'], { stdio: 'inherit' })
}

release().catch((e) => {
  log.error(e)
  process.exit(1)
})
