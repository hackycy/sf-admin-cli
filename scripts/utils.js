'use strict'

const axios = require('axios')
const fs = require('fs')
const log = require('npmlog')

function initLog() {
  log.heading = 'sf tool'
}

// 初始化npmlog配置
initLog()

const MOCK_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'

/**
 * 下载文件
 * @param {string} fileUrl 下载文件链接
 * @param {string} output 输出的文件路径
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
    
    log.enableProgress()

    const writer = fs.createWriteStream(output)
    data.pipe(writer)
    data.on('data', (chunk) => {
      log.showProgress('downloading...', (downloadLength += chunk.length) / totalLength)
    })
    writer.on('error', (err) => {
      writer.close()
      log.disableProgress()
      reject(err)
    })
    writer.on('close', () => {
      log.disableProgress()
      resolve()
    })
  })
}

module.exports = {
  downloadFile,
  log
}