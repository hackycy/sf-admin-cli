'use strict'

const axios = require('axios')
const fs = require('fs')
const log = require('npmlog')
const { Octokit } = require('@octokit/core')
const path = require('path')
const chalk = require('chalk')
const readline = require('readline')
const owner = require('../package.json').author

// log config
log.heading = 'sf tool'

log.clearConsole = function (title) {
  if (process.stdout.isTTY) {
    const blank = '\n'.repeat(process.stdout.rows)
    console.log(blank)
    readline.cursorTo(process.stdout, 0, 0)
    readline.clearScreenDown(process.stdout)
    console.log(chalk.bold.blue(`Running Script: ${process.argv.join(' ')}`))
    if (title) {
      console.log(title)
    }
  }
}

// github api
const octokit = new Octokit()

const MOCK_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'

/**
 * 下载文件
 * @param {string} fileUrl 下载文件链接
 * @param {string} output 输出的文件路径，必须为文件夹路径
 */
async function downloadFile(fileUrl, output) {
  log.info('正在读取链接...')
  const { data, headers } = await axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
    headers: {
      'User-Agent': MOCK_UA
    }
  })

  let filename = null

  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/
  const matches = filenameRegex.exec(headers['content-disposition'])
  if (matches != null && matches[1]) { 
    filename = matches[1].replace(/['"]/g, '')
  } else {
    throw new Error('无法获取文件名称...请检查Header头中配置的content-disposition')
  }

  output = path.join(output, filename)

  log.info('正在下载资源文件中...')
  return new Promise((resolve, reject) => {
    const totalLength = headers['content-length']
    let downloadLength = 0
    
    // 启用进度条
    log.enableProgress()

    const writer = fs.createWriteStream(output)
    data.pipe(writer)
    data.on('data', (chunk) => {
      log.showProgress('下载中...', (downloadLength += chunk.length) / totalLength)
    })
    writer.on('error', (err) => {
      writer.close()
      // 关闭进度条
      log.disableProgress()
      reject(err)
    })
    writer.on('close', () => {
      // 关闭进度条
      log.disableProgress()
      log.info(`文件${filename}已下载完成`)
      resolve(filename)
    })
  })
}

/**
 * 获取仓库分支
 * @param {string} repo 
 * @returns 
 */
async function getRepoBranches(repo) {
  const { data } = await octokit.request('GET /repos/{owner}/{repo}/branches', {
    owner,
    repo
  })
  return data.map(e => e.name)
}

/**
 * hackycy-sf-nest-admin-v2.1.0.1-0-g40df6e5.zip -> hackycy-sf-nest-admin-40df6e5
 * @param {string} filename 
 * @param {string} repo 
 * @returns 
 */
function parseRealUnZipGithubDirName(filename, repo) {
  const sp = filename.split('-')
  const commitId = sp[sp.length - 1] // remove g
  return `${owner}-${repo}-${/^g/.test(commitId) ? commitId.substr(1) : commitId}`
}

/**
 * 获取模板路径
 * @param {string} repo 
 * @returns 
 */
function getTemplatePath(repo) {
  return path.resolve(__dirname, '../', 'commands', 'create', 'template', repo)
}

module.exports = {
  downloadFile,
  getRepoBranches,
  parseRealUnZipGithubDirName,
  getTemplatePath,
  log
}