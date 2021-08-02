'use strict'

/**
 * 
 * @typedef { import('mysql').Connection } MySQLConnection
 * @param {MySQLConnection} connection 
 * @param {string | mysql.QueryOptions} sql 
 * @param {*} value 
 */
function querySync(connection, sql, value) {
  if (typeof sql === 'string') {
    connection.query(sql, value)
  }
}

module.exports = querySync