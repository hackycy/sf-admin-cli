'use strict'

const { log, fs, chalk } = require('@sfadminltd/utils')
const path = require('path')
const globby = require('globby')
const getConnection = require('./connect')
const promisify = require('./promisify')

/**
 * @typedef { import('mysql').Connection } MySQLConnection
 * @type {MySQLConnection}
 */
let connection

/**
 * load sql script
 */
async function load(options) {
  // 检查文件夹是否存在
  const cwd = process.cwd()
  const targetDir = path.resolve(cwd, options.evalDir)
	const { databaseName } = options

  // 文件夹是否存在
  if (!fs.existsSync(targetDir)) {
    log.error('Target directory does not exist', chalk.yellow(targetDir))
    log.notice('load',
      'You can add the -e parameter to specify the relative path of the folder where the sql script is stored, ' +
        `for example ${chalk.green('-e ./init')}`
    )
    return
  }

	// 查找当前目录下的sql文件
	const sqlFileList = await globby('**/*.sql', { cwd: targetDir })
	if (sqlFileList.length <= 0) {
		log.notice('load', 'Cannot find runnable sql script in the current folder:', chalk.yellow(targetDir))
		return
	}
	log.verbose('find sql', sqlFileList)

  log.info('load', 'Trying to connect...')
  connection = await getConnection(options)
  // convert to async / await
  connection.queryPromisify = promisify(connection.query, connection)
  log.info('load', 'Connection succeeded')

	// 查询是否需要创建数据库
  const shouldCreateDataBase = 
		(await connection.queryPromisify('SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = ?', [databaseName])).length <= 0

  if (!shouldCreateDataBase && options.overwrite) {
    // 强制删除数据库
    await connection.queryPromisify('DROP DATABASE IF EXISTS ??', [databaseName])
  } else {
		log.notice('load', `The current database already exists: ${chalk.cyan(databaseName)}`, `but you can add the ${chalk.green('-o')} parameter to force overwrite (dangerous operation)`)
		return
	}

	// 创建数据库
	await connection.queryPromisify('CREATE DATABASE ??', [databaseName])
  await connection.queryPromisify('USE ??', [databaseName])

  // 移除掉sql文件注释
  const sqlDocRegExp = /(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)|--.*(\r\n|\r|\n)/gm

  for(let i = 0; i < sqlFileList.length; i++) {
    const fileAbsPath = path.join(targetDir, sqlFileList[i])
    log.notice('load', `importing sql: ${chalk.yellow(fileAbsPath)}`)
    const sql = fs.readFileSync(fileAbsPath, { encoding: 'utf8' })
    const pureSql = sql.replace(sqlDocRegExp, '')
    await connection.queryPromisify(pureSql)
  }
}

module.exports = (...args) => {
  return load(...args)
    .catch((err) => {
      log.error('load', chalk.red(err))
    })
    .finally(() => {
      if (connection) {
        connection.destroy()
      }
    })
}
