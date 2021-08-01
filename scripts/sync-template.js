'use strict'

const { log, getRepoBranches, downloadFile, parseRealUnZipGithubDirName, getTemplatePath } = require('./utils')
const inquirer = require('inquirer')
const path = require('path')
const fs = require('fs-extra')
const AdmZip = require('adm-zip')
const owner = require('../package.json').author
const globby = require('globby')
const parseGitignore = require('parse-gitignore')
const chalk = require('chalk')

const SUPPORT_REPO = ['nest', 'midway']
const LOCAL_CONFIG_FILE = ['config.local.ts', 'config.development.ts']

// 临时文件夹目录
const TEMP_DIR_PATH = path.resolve(__dirname, '../', 'temp')
const GITHUB_API_PREFIX = 'https://api.github.com'

/**
 * 同步仓库模板，支持nest，midway
 */
async function syncTemplate() {
  // 确保临时目录存在
  fs.ensureDirSync(TEMP_DIR_PATH)

  log.clearConsole()
   const { repo } = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: '请选择需要同步的后端模版仓库',
      choices: SUPPORT_REPO
    }
  ])

  log.info('正在获取Server端仓库存在的分支...')
  const serverRepo = `sf-${repo}-admin`
  const vueRepo = 'sf-vue-admin'
  const tplPath = getTemplatePath(repo)

  // 获取远端分支后提供选择
  const serverRemoteBranchs = await getRepoBranches(serverRepo)
  log.clearConsole()

  const { branch: serverBranch } = await inquirer.prompt([{
    type: 'list',
    name: 'branch',
    message: `请选择需要同步后端${repo}的分支`,
    choices: serverRemoteBranchs
  }])

  // 下载文件 https://docs.github.com/en/rest/reference/repos#download-a-repository-archive-zip
  const serverZipFileName = await downloadFile(
    `${GITHUB_API_PREFIX}/repos/${owner}/${serverRepo}/zipball/${serverBranch}`,
    TEMP_DIR_PATH
  )

  // 解压文件
  log.info(`开始解压 ${serverZipFileName} ...`)
  const serverZip = new AdmZip(path.join(TEMP_DIR_PATH, serverZipFileName))
  serverZip.extractAllTo(TEMP_DIR_PATH, true)

  // 解压目录
  const unzipServerDirName = parseRealUnZipGithubDirName(path.basename(serverZipFileName, '.zip'), serverRepo)
  const absoluteUnzipServerDirPath = path.join(TEMP_DIR_PATH, unzipServerDirName)

  // 拷贝sample 下的默认配置
  log.clearConsole(`解压 ${chalk.yellow(serverZipFileName)} 完毕，解压目录为：${chalk.yellow(unzipServerDirName)}`)
  const { config: localConfigName } = await inquirer.prompt([{
    type: 'list',
    name: 'config',
    message: `请选择需要拷贝的${repo}版本地环境配置文件`,
    choices: LOCAL_CONFIG_FILE
  }])

  log.info('正在拷贝Sample配置...')
  const [ configFilePath ] = 
    await globby(`**/${localConfigName}`, { absolute: true, cwd: absoluteUnzipServerDirPath })
  if (!configFilePath) {
    throw new Error('查找Sample配置文件失败')
  }
  fs.copyFileSync(configFilePath, path.join(TEMP_DIR_PATH, unzipServerDirName, 'src', 'config', localConfigName))
  log.info('拷贝Sample配置完成')

  // 选择过滤.gitignore
  const gitignoreFilePath = path.join(TEMP_DIR_PATH, unzipServerDirName, '.gitignore')
  const gitignores = parseGitignore(fs.readFileSync(gitignoreFilePath))
  log.clearConsole()
  const { ignore: ignoreList } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'ignore',
    message: '请选择需要删除的.gitignore配置',
    choices: gitignores,
    pageSize: 10
  }])

  if (ignoreList.length > 0) {
    log.info('正在重新生成.gitignore文件...')
    fs.removeSync(gitignoreFilePath)
    const newGitIgnoreList = gitignores.filter((item) => {
      return !ignoreList.includes(item)
    })
    fs.outputFileSync(gitignoreFilePath, newGitIgnoreList.join('\n'))
    log.info('已重新生成.gitignore文件')
  }

  log.clearConsole()
  // 选择需要移除的文件夹或者文件
  const serverDirList = fs.readdirSync(absoluteUnzipServerDirPath)
  const { delete: needDeleteServerDirList } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'delete',
    message: '请选择需要删除的文件夹或者文件',
    choices: serverDirList,
    pageSize: 10
  }])

  if (needDeleteServerDirList.length > 0) {
    for (let i = 0; i < needDeleteServerDirList.length; i++) {
      const dpath = path.join(absoluteUnzipServerDirPath, needDeleteServerDirList[i])
      log.info(`正在删除 ${chalk.yellow(dpath)}`)
      fs.removeSync(dpath)
    }
  }

  log.clearConsole()
  log.info(`正在拷贝${repo}模板...`)
  const serverTplPath = path.join(tplPath, 'server')
  fs.ensureDirSync(serverTplPath)
  fs.emptyDirSync(serverTplPath)
  fs.moveSync(absoluteUnzipServerDirPath, serverTplPath, { overwrite: true })
  log.info(`拷贝${repo}模板完成`)

  // --------------------- server端模板操作结束，vue端模板操作开始 ----------------

  log.clearConsole('Server端模板同步已完成，开始执行Vue端模板同步')
  log.info('正在获取Vue端仓库存在的分支...')
  const vueRemoteBranchs = await getRepoBranches(vueRepo)

  log.clearConsole()

  const { branch: vueBranch } = await inquirer.prompt([{
    type: 'list',
    name: 'branch',
    message: `请选择需要同步${repo}版Vue端分支`,
    choices: vueRemoteBranchs
  }])

  // 下载文件 https://docs.github.com/en/rest/reference/repos#download-a-repository-archive-zip
  const vueZipFileName = await downloadFile(
    `${GITHUB_API_PREFIX}/repos/${owner}/${vueRepo}/zipball/${vueBranch}`,
    TEMP_DIR_PATH
  )

  // 解压文件
  log.info(`开始解压 ${vueZipFileName} ...`)
  const vueZip = new AdmZip(path.join(TEMP_DIR_PATH, vueZipFileName))
  vueZip.extractAllTo(TEMP_DIR_PATH, true)

  // 解压目录
  const unzipVueDirName = parseRealUnZipGithubDirName(path.basename(vueZipFileName, '.zip'), vueRepo)
  const absoluteUnzipVueDirPath = path.join(TEMP_DIR_PATH, unzipVueDirName)

  log.clearConsole()
  // 选择需要移除的文件夹或者文件
  const vueDirList = fs.readdirSync(absoluteUnzipVueDirPath)
  const { delete: needDeleteVueDirList } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'delete',
    message: '请选择需要删除的文件夹或者文件',
    choices: vueDirList,
    pageSize: 10
  }])

  if (needDeleteVueDirList.length > 0) {
    for (let i = 0; i < needDeleteVueDirList.length; i++) {
      const dpath = path.join(absoluteUnzipVueDirPath, needDeleteVueDirList[i])
      log.info(`正在删除 ${chalk.yellow(dpath)}`)
      fs.removeSync(dpath)
    }
  }

  log.clearConsole()
  log.info(`正在拷贝Vue对应${chalk.cyan(vueBranch)}分支模板...`)
  const vueTplPath = path.join(tplPath, 'vue')
  fs.ensureDirSync(vueTplPath)
  fs.emptyDirSync(vueTplPath)
  fs.moveSync(absoluteUnzipVueDirPath, vueTplPath, { overwrite: true })
  log.info(`拷贝${repo}模板完成`)
}

syncTemplate().catch(e => {
  log.error(e)
  process.exit(1)
})