'use strict'

const mysql = require('mysql')

/**
 * 建立数据库连接
 * @param {Record<string, string | boolean>} cliOptions 
 * @returns {Promise<mysql.Connection>}
 */
module.exports = function createConnection(cliOptions) {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection({
      host: cliOptions.host,
      user: cliOptions.username,
      password: cliOptions.password,
      port: cliOptions.port,
      debug: process.env.SF_CLI_DEBUG
    })
    connection.connect((err) => {
      if (err) {
        reject(err)
      } else {
        resolve(connection)
      }
    })
  })
}