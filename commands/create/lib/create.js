'use strict'

const path = require('path')
const { checkVersion } = require('./check-version')
const { validateProjectName } = require('./validate')
const { resolveTargetDir, resolvePreset } = require('./prompt')
const { log, fs, chalk } = require('@sfadminltd/utils')
const { loadPreset, serverTpl, vueTpl, tpl } = require('./load-preset')
const { shouldInitGit } = require('./should-init-git')
const run = require('./run')

async function create(projectName, options) {
  // 检查更新
  await checkVersion(process.env.SF_CLI_VERSION, process.env.SF_CLI_NAME, options.taobao)

  const cwd = process.cwd()

  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')
  log.verbose(`cwd: ${cwd}, target: ${targetDir}`)

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

  // 选择模板的预设值
  const action = await resolvePreset(presets)

  // 模版目录
  const templatePath = path.resolve(__dirname, '../', tpl, action)

  log.clearConsole()

  log.info(`Creating project in ${chalk.yellow(targetDir)}`)

  // 确保目录存在
  fs.ensureDirSync(targetDir)
  fs.copySync(templatePath, targetDir)

  // git init
  const initGit = shouldInitGit(options, targetDir)
  const splitInitGit = options.splitGit
  if (initGit) {
    log.info('Initializing git repository...')
    if (!splitInitGit) {
      await run(targetDir, 'git init')
    } else {
      // 分开初始化
      await run(path.join(targetDir, serverTpl), 'git init')
      await run(path.join(targetDir, vueTpl), 'git init')
    }
  }

  // git commit
  let gitCommitFailed = false
  if (initGit) {
    const msg = typeof options.git === 'string' ? options.git : 'init'
    if (!splitInitGit) {
      await run(targetDir, 'git add -A')
      try {
        await run(targetDir, 'git', ['commit', '-m', msg, '--no-verify'])
      } catch (e) {
        gitCommitFailed = true
      }
    } else {
      // 分开初始化
      await run(path.join(targetDir, serverTpl), 'git add -A')
      await run(path.join(targetDir, vueTpl), 'git add -A')
      try {
        await run(path.join(targetDir, serverTpl), 'git', ['commit', '-m', msg, '--no-verify'])
        await run(path.join(targetDir, vueTpl), 'git', ['commit', '-m', msg, '--no-verify'])
      } catch (e) {
        gitCommitFailed = true
      }
    }
  }

  log.notice(`🎉  Successfully created project ${chalk.yellow(name)}.`)

  // git commit初始化失败提示
  if (gitCommitFailed) {
    log.warn(
      'Skipped git commit due to missing username and email in git config, or failed to sign commit.'
    )
  }
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    log.error(err)
  })
}
