'use strict'

const { log, fs, chalk } = require('@sfadminltd/utils')
const path = require('path')
const getConnection = require('./connect')

/**
 * load sql script
 */
async function load(options) {
	// 检查文件夹是否存在
	const cwd = process.cwd()
	const targetDir = path.resolve(cwd, options.evalDir)

	// 文件夹是否存在
	if (!fs.existsSync(targetDir)) {
		log.error('Target directory does not exist', chalk.yellow(targetDir))
		log.notice(
			'You can use the -e parameter to specify the relative path of the folder where the sql script is stored, ' 
			+ `for example ${chalk.green('-e ./init')}`
		)
		return
	}

	log.info('Trying to connect...')
	const connection = await getConnection(options)
	log.info('Connection succeeded')

	if (options.overwrite) {
		// 强制删除数据库
		connection.query(`DRAP DATABSE IF EXISTS ${options.databaseName};`)
	}
}

module.exports = (...args) => {
  return load(...args).catch((err) => {
		log.error(`Load the script error, reason: ${err}`)
  })
}

