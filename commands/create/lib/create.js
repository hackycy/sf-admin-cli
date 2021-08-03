'use strict'

const path = require('path')
const { checkVersion } = require('./check-version')
const { validateProjectName } = require('./validate')
const { resolveTargetDir, resolvePreset, resolvePackageManager } = require('./prompt')
const { log, fs, chalk, pkg } = require('@sfadminltd/utils')
const { loadPreset, serverTpl, vueTpl, tpl } = require('./load-preset')
const { shouldInitGit } = require('./should-init-git')
const generateReadme = require('./generate-readme')
const run = require('./run')
const writeFileTree = require('./write-file-tree')

async function create(projectName, options) {
  // 检查更新
  await checkVersion(process.env.SF_CLI_VERSION, process.env.SF_CLI_NAME, options.taobao)

  const cwd = process.cwd()

  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')
  const targetServerDir = path.resolve(targetDir, serverTpl)
  const targetVueDir = path.resolve(targetDir, vueTpl)

  log.verbose('create', `Cwd: ${cwd}, Target: ${targetDir}`)

  // 校验 输入的project name
  validateProjectName(name)

  // 检查目标目录
  if (!(await resolveTargetDir(targetDir, inCurrent, options))) {
    return
  }
  
  // load preset
  const presets = loadPreset()
  if (presets.length <= 0) {
    throw new Error('Current preset is empty')
  }
  log.verbose('create', 'Local preset', presets.join(','))

  log.clearConsole()

  // 选择模板的预设值
  const action = await resolvePreset(presets)

  log.clearConsole()

  // 选择npm管理器
  const packageManager = await resolvePackageManager()

  // 模版目录
  const templatePath = path.resolve(__dirname, '../', tpl, action)

  log.clearConsole()

  log.info('create', `Creating project in ${chalk.yellow(targetDir)}`)

  // 确保目录存在
  fs.ensureDirSync(targetDir)
  fs.copySync(templatePath, targetDir)

  log.info('create', 'Updating package.json...')

  writeFileTree(targetServerDir, {
    'package.json': JSON.stringify(Object.assign(pkg.resolvePkg(targetServerDir), {
      name: `${name}-${serverTpl}`,
      version: '0.1.0',
      private: true,
      description: `Create By sf-${action}-admin`
    }), null, 2)
  })
  writeFileTree(targetVueDir, {
    'package.json': JSON.stringify(Object.assign(pkg.resolvePkg(targetVueDir), {
      name: `${name}-${vueTpl}`,
      version: '0.1.0',
      private: true,
      description: 'Create By sf-vue-admin'
    }), null, 2)
  })

  // git init
  const initGit = shouldInitGit(options, targetDir)
  const splitInitGit = options.splitGit
  if (initGit) {
    log.info('create', 'Initializing git repository...')
    if (!splitInitGit) {
      await run(targetDir, 'git init')
    } else {
      // 分开初始化
      await run(targetServerDir, 'git init')
      await run(targetVueDir, 'git init')
    }
  }

  // gen readme
  log.info('create', 'Generating README.md...')
  writeFileTree(targetServerDir, {
    'README.md': generateReadme(serverTpl, name, packageManager)
  })
  writeFileTree(targetVueDir, {
    'README.md': generateReadme(vueTpl, name, packageManager)
  })

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
      await run(targetServerDir, 'git add -A')
      await run(targetVueDir, 'git add -A')
      try {
        await run(targetServerDir, 'git', ['commit', '-m', msg, '--no-verify'])
        await run(targetVueDir, 'git', ['commit', '-m', msg, '--no-verify'])
      } catch (e) {
        gitCommitFailed = true
      }
    }
  }

  log.info('create', `Successfully created project ${chalk.yellow(name)}.`)

  // git commit初始化失败提示
  if (gitCommitFailed) {
    log.warn(
      'create',
      'Skipped git commit due to missing username and email in git config, or failed to sign commit.'
    )
  }
}

module.exports = (...args) => {
  return create(...args).catch((err) => {
    log.error('create', chalk.red(err))
  })
}
