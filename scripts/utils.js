'use strict'

const axios = require('axios')
const fs = require('fs')
const path = require('path')
const log = require('npmlog')

// 初始化npmlog配置
function initLog() {
  log.heading = 'sf tool'
}

initLog()

const MOCK_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'

/**
 * 下载文件
 * @param {string} fileUrl 下载文件链接
 * @param {string} output 输出的文件路径，必须为文件路径不可以为文件夹路径
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
      log.info(`文件${path.basename(output)}已下载完成`)
      resolve()
    })
  })
}

module.exports = {
  downloadFile,
  log
}