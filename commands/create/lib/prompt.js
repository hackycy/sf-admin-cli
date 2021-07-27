'use strict'

const { inquirer, fs, log, chalk } = require('@sfadminltd/utils')

/**
 * 判断文件夹是否覆盖等操作，无命令提供时则弹出选择提示
 * @param {string} targetDir 
 * @param {boolean} inCurrent 
 * @param {Object} options 
 * @returns 
 */
async function resolveTargetDir(targetDir, inCurrent, options) {
  // 文件夹是否已存在
  if (fs.existsSync(targetDir)) {
    // overwrite
    if (options.force) {
      fs.removeSync(targetDir)
    } else {
      if (inCurrent) {
        const { ok } = await inquirer.prompt([
          {
            name: 'ok',
            type: 'confirm',
            message: 'Generate project in current directory?'
          }
        ])
        if (!ok) {
          return false
        }
      } else {
        const { action } = await inquirer.prompt([
          {
            name: 'action',
            type: 'list',
            message: `Target directory ${chalk.cyan(
              targetDir
            )} already exists. Pick an action:`,
            choices: [
              { name: 'Overwrite', value: 'overwrite' },
              { name: 'Cancel', value: false }
            ]
          }
        ])
        if (!action) {
          return false
        } else if (action === 'overwrite') {
          log.info(`Removing ${chalk.cyan(targetDir)}`)
          fs.removeSync(targetDir)
        }
      }
    }
  }
  return true
}

/**
 * 选择需要创建的项目
 * @param {string[]} presets 
 */
async function resolvePreset(presets) {
  const presetChoices = presets.map(p => {
    return { name: p, value: p }
  })
  const { action } = await inquirer.prompt([
    {
      name: 'action',
      type: 'list',
      message: 'Please pick a preset: ',
      choices: presetChoices
    }
  ])
  return action
}

module.exports = {
  resolveTargetDir,
  resolvePreset
}
