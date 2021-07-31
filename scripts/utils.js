'use strict'

const axios = require('axios')
const fs = require('fs')
const log = require('npmlog')

log.heading = 'sf tool'

/**
 * 下载文件
 * @param {string} fileUrl 下载文件链接
 * @param {string} output 输出的文件路径
 */
async function downloadFile(fileUrl, output) {
  const writer = fs.createWriteStream(output)
  const response = await axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36'
    }
  })
  return new Promise((resolve, reject) => {
    response.data.pipe(writer)
    writer.on('error', (err) => {
      writer.close()
      reject(err)
    })
    writer.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  downloadFile,
  log
}