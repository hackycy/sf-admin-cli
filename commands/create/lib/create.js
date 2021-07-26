'use strict'

const path = require('path')
const { checkVersion } = require('./check-version')
const validateProjectName = require('validate-npm-package-name')
const { log, exit, chalk, fs, inquirer } = require('@sfadminltd/utils')

async function create(projectName, options) {
  // 检查更新
  await checkVersion(process.env.SF_CLI_VERSION, process.env.SF_CLI_NAME, options.taobao)

  const cwd = process.cwd()
  const inCurrent = projectName === '.'
  const name = inCurrent ? path.relative('../', cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || '.')

  // 校验 输入的project name
  const result = validateProjectName(name)
  if (!result.validForNewPackages) {
    // 名称不合法
    log.error(chalk.red(`Invalid project name: "${name}"`))
    result.errors && result.errors.forEach(err => {
      log.error(chalk.red.dim(err))
    })
    result.warnings && result.warnings.forEach(warn => {
      log.warn(chalk.red.dim(warn))
    })
    exit(1)
  }

  // 文件夹是否已存在
  if (fs.existsSync(targetDir)) {
    // overwrite
    if (options.force) {
      fs.removeSync(targetDir)
    } else {
      if (inCurrent) {
        const { ok } = await inquirer.prompt([{
          name: 'ok',
          type: 'confirm',
          message: 'Generate project in current directory?'
        }])
        if (!ok) {
          return
        }
      } else {
        const { action } = await inquirer.prompt([{
          name: 'action',
          type: 'list',
          message: `Target directory ${chalk.cyan(targetDir)} already exists. Pick an action:`,
          choices: [
            { name: 'Overwrite', value: 'overwrite' },
            { name: 'Cancel', value: false }
          ]
        }])
        if (!action) {
          return
        } else if (action === 'overwrite') {
          log.info(`Removing ${chalk.cyan(targetDir)}`)
          fs.removeSync(targetDir)
        }
      }
    }
  }
}

module.exports = (...args) => {
  return create(...args).catch(() => {})
}
