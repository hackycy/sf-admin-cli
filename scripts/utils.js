'use strict'

const axios = require('axios')
const fs = require('fs')

/**
 * basic log
 * @param {string} msg 
 */
function log(msg) {
  console.log(`>>>>>>>>>>>>> ${msg} >>>>>>>>>>>>>`)
}

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
    responseType: 'stream'
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