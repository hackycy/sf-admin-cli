'use strict'

const path = require('path')
const { checkVersion } = require('./check-version')
const { validateProjectName } = require('./validate')
const { resolveTargetDir, resolvePreset } = require('./prompt')
const { log, fs, chalk } = require('@sfadminltd/utils')
const { loadPreset, tpl } = require('./load-preset')
const { shouldInitGit } = require('./should-init-git')

async function create(projectName, options) {
  // 检查更新
  await checkVersion(process.env.SF_CLI_VERSION, process.env.SF_CLI_NAME, options.taobao)

  const cwd = process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  // 校验 输入的project name
  validateProjectName(name)

  // 检查目标目录
  if (!(await resolveTargetDir(targetDir, inCurrent, options))) {
    return
  }
  
  // load preset
  const presets = loadPreset()
  if (presets.length <= 0) {
    throw new Error('current preset is empty')
  }
  log.verbose('local preset', presets.join(','))

  log.clearConsole()

  const action = await resolvePreset(presets)

  // 模版目录
  const templatePath = path.resolve(__dirname, '../', tpl, action)

  log.clearConsole()

  log.info(`Creating project in ${chalk.yellow(targetDir)}`)

  // 确保目录存在
  fs.ensureDirSync(targetDir)
  fs.copySync(templatePath, targetDir)

  // 是否需要初始化git
  const initGit = shouldInitGit(options, targetDir)
  if (initGit) {
    log.info('Initializing git repository...')
  }
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    log.error(err)
  })
}
