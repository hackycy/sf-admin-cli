'use strcit'

/**
 * 同步 Nest / Midway / Vue仓库的项目模板
 */
const { downloadFile, log } = require('./utils')
const AdmZip = require('adm-zip')
const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')

const NEST_REPO = {
  repoName: 'sf-nest-admin',
  branch: 'main',
  zipName: 'nest-server.zip',
  vueBranch: 'nest',
  deleteFiles: [
    '.dockerignore',
    'Dockerfile',
    'LICENSE',
    'README.md',
    '.github',
    'docs',
    'test',
    'public'
  ]
}

const MIDWAY_REPO = {
  repoName: 'sf-midway-admin',
  branch: 'main',
  zipName: 'midway-server.zip',
  vueBranch: 'midway',
  deleteFiles: [
    '.dockerignore',
    'Dockerfile',
    'LICENSE',
    'README.md',
    '.github',
    'docs',
    'test',
    'public'
  ]
}

const VUE_REPO = 'sf-vue-admin'

const DOWNLOAD_URL = 'https://github.com.cnpmjs.org/hackycy/$1/archive/refs/heads/$2.zip'

// like download this sample file url:
// https://github.com/hackycy/sf-vue-admin/archive/refs/heads/dev.zip
;(async () => {
  // 选择同步的仓库，现只支持nest，midway
  const anwsers = await inquirer.prompt([
    {
      type: 'list',
      name: 'repo',
      message: '请选择同步的模版类型',
      choices: ['nest', 'midway']
    }
  ])

  const type = anwsers.repo

  let repo

  if (type === 'nest') {
    repo = NEST_REPO
  } else {
    repo = MIDWAY_REPO
  }

  // 获取temp文件夹
  const tempDirPath = path.resolve(__dirname, '../temp')

  // 模版文件根目录
  const tplPath = path.resolve(__dirname, '../commands/create/template', type)
  fs.ensureDirSync(tplPath)

  // 处理temp文件夹，防止文件夹不存在
  fs.ensureDirSync(tempDirPath)
  fs.emptyDirSync(tempDirPath)

  log(`开始下载${type}仓库代码`)
  const nestDownloadUrl = DOWNLOAD_URL.replace('$1', repo.repoName).replace(
    '$2',
    repo.branch
  )
  await downloadFile(nestDownloadUrl, path.resolve(tempDirPath, repo.zipName))
  log(`已下载${type}仓库代码`)

  log(`开始下载${type}对应前端仓库${repo.vueBranch}分支代码`)
  const vueDownloadUrl = DOWNLOAD_URL.replace('$1', VUE_REPO).replace(
    '$2',
    repo.vueBranch
  )
  await downloadFile(
    vueDownloadUrl,
    path.resolve(tempDirPath, `${repo.vueBranch}-vue.zip`)
  )
  log(`已下载${type}对应前端仓库代码`)

  // 解压server
  log(`正在解压${repo.zipName}代码`)
  const serverZip = new AdmZip(path.resolve(tempDirPath, repo.zipName))
  serverZip.extractAllToAsync(tempDirPath, true)

  const unzipServerDirName = `${repo.repoName}-${repo.branch}`

  for (let i = 0; i < repo.deleteFiles.length; i++) {
    log(`正在删除无用目录 ${repo.deleteFiles[i]}`)
    fs.removeSync(path.resolve(tempDirPath, unzipServerDirName, repo.deleteFiles[i]))
  }

  // 拷贝server代码
  log('拷贝Server代码')
  const serverPath = path.resolve(tplPath, 'server')
  fs.ensureDirSync(serverPath)
  fs.emptyDirSync(serverPath)

  log(`移动${unzipServerDirName}目录至${serverPath}`)
  fs.moveSync(path.resolve(tempDirPath, unzipServerDirName), serverPath, { overwrite: true })

  log(`正在解压${repo.vueBranch}-vue代码`)
  const vueZip = new AdmZip(path.resolve(tempDirPath, `${repo.vueBranch}-vue.zip`))
  vueZip.extractAllToAsync(tempDirPath, true)

  const unzipVueDirName = `${VUE_REPO}-${repo.vueBranch}`

  log('拷贝Vue代码')
  const vuepath = path.resolve(tplPath, 'vue')
  fs.ensureDirSync(vuepath)
  fs.emptyDirSync(vuepath)

  log(`移动${unzipVueDirName}目录至${vuepath}`)
  fs.moveSync(path.resolve(tempDirPath, unzipVueDirName), vuepath, { overwrite: true })

  log('同步模版完成')
})()
