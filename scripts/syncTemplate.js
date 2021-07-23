'use strict'

/**
 * 同步 Nest / Midway / Vue仓库的项目模板
 */
const { downloadFile, log } = require('./utils')
const AdmZip = require('adm-zip')
const inquirer = require('inquirer')
const fs = require('fs-extra')
const path = require('path')
const parse = require('parse-gitignore')

const NEST_REPO = {
  repoName: 'sf-nest-admin',
  branch: 'main',
  zipName: 'nest-server.zip',
  vueBranch: 'nest',
  devConfigName: 'config.development.ts',
  devSamplePath: ['docs', 'sample'],
  devConfigPath: ['src', 'config'],
  deleteFiles: [
    '.dockerignore',
    'Dockerfile',
    'LICENSE',
    'README.md',
    '.github',
    'docs',
    'test'
  ]
}

const MIDWAY_REPO = {
  repoName: 'sf-midway-admin',
  branch: 'main',
  zipName: 'midway-server.zip',
  vueBranch: 'midway',
  devConfigName: 'config.local.ts',
  devSamplePath: ['docs', 'sample'],
  devConfigPath: ['src', 'config'],
  deleteFiles: [
    '.dockerignore',
    'Dockerfile',
    'LICENSE',
    'README.md',
    '.github',
    'docs',
    'test'
  ]
}

const VUE_REPO = {
  repoName: 'sf-vue-admin',
  deleteFiles: [
    '.dockerignore',
    'Dockerfile',
    'LICENSE',
    'README.md',
    '.github'
  ]
}

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

  log(`已选择同步${type}仓库模版`)

  // 获取temp文件夹
  const tempDirPath = path.resolve(__dirname, '../temp')

  // 模版文件根目录
  const tplPath = path.resolve(__dirname, '../commands/create/template', type)
  fs.ensureDirSync(tplPath)

  // 处理temp文件夹，防止文件夹不存在
  fs.ensureDirSync(tempDirPath)
  fs.emptyDirSync(tempDirPath)

  //--------------------------------------------------

  log(`开始下载${type}仓库代码`)
  const nestDownloadUrl = DOWNLOAD_URL.replace('$1', repo.repoName).replace(
    '$2',
    repo.branch
  )
  await downloadFile(nestDownloadUrl, path.resolve(tempDirPath, repo.zipName))
  log(`已下载${type}仓库代码`)

  log(`开始下载${type}对应前端仓库${repo.vueBranch}分支代码`)
  const vueDownloadUrl = DOWNLOAD_URL.replace('$1', VUE_REPO.repoName).replace(
    '$2',
    repo.vueBranch
  )
  await downloadFile(
    vueDownloadUrl,
    path.resolve(tempDirPath, `${repo.vueBranch}-vue.zip`)
  )
  log(`已下载${type}对应前端仓库代码`)

  //----------------------------------------------------------------
  const unzipServerDirName = `${repo.repoName}-${repo.branch}`
  const unzipServerDirPath = path.resolve(tempDirPath, unzipServerDirName)

  // 解压server
  log(`正在解压${repo.zipName}代码`)
  const serverZip = new AdmZip(path.resolve(tempDirPath, repo.zipName))
  serverZip.extractAllTo(tempDirPath, true)

  log('拷贝dev config文件')

  fs.copySync(
    path.resolve(unzipServerDirPath, ...repo.devSamplePath, repo.devConfigName),
    path.resolve(unzipServerDirPath, ...repo.devConfigPath, repo.devConfigName))

  log('重新生成.gitignore文件')
  const ignoreFilePath = path.resolve(unzipServerDirPath, '.gitignore')
  const ignoreArr = parse(fs.readFileSync(ignoreFilePath))
  // delete
  fs.removeSync(ignoreFilePath)
  // 移除dev config ignore
  const newIgnoreArr = ignoreArr.filter((v) => {
    if (v.includes(path.basename(repo.devConfigName, '.ts'))) {
      return false
    }
    if (v.includes('docs')) {
      return false
    }
    return true
  })
  fs.outputFileSync(ignoreFilePath, newIgnoreArr.join('\n'))

  
  // delete
  for (let i = 0; i < repo.deleteFiles.length; i++) {
    const dpath = path.resolve(unzipServerDirPath, repo.deleteFiles[i])
    log(`执行删除 ${dpath}`)
    fs.removeSync(dpath)
  }

  // 拷贝server代码
  log('移动Server模版代码')
  const serverPath = path.resolve(tplPath, 'server')
  fs.ensureDirSync(serverPath)
  fs.emptyDirSync(serverPath)

  log(`移动${unzipServerDirName}目录至${serverPath}`)
  fs.moveSync(path.resolve(tempDirPath, unzipServerDirName), serverPath, { overwrite: true })

  log('Server 模版同步完成')

  //--------------------------------------------------------------
  const unzipVueDirName = `${VUE_REPO.repoName}-${repo.vueBranch}`
  const unzipVueDirPath = path.resolve(tempDirPath, unzipVueDirName)

  log(`正在解压${repo.vueBranch}-vue代码`)
  const vueZip = new AdmZip(path.resolve(tempDirPath, `${repo.vueBranch}-vue.zip`))
  vueZip.extractAllTo(tempDirPath, true)

  log('移动Vue模版代码')
  const vuepath = path.resolve(tplPath, 'vue')
  fs.ensureDirSync(vuepath)
  fs.emptyDirSync(vuepath)

  for(let i = 0; i < VUE_REPO.deleteFiles.length; i++) {
    const dpath = path.resolve(unzipVueDirPath, VUE_REPO.deleteFiles[i])
    log(`执行删除 ${dpath}`)
    fs.removeSync(dpath)
  }

  log(`移动${unzipVueDirName}目录至${vuepath}`)
  fs.moveSync(path.resolve(tempDirPath, unzipVueDirName), vuepath, { overwrite: true })

  log('Vue 模版同步完成')

  //--------------------------------------------------------------
})()
