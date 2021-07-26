'use strict'

const pkg = require('../package.json')
const { log, chalk, semver, exit } = require('@sfadminltd/utils')
const rootCheck = require('root-check')
const registerCommand = require('./register-command')

/**
 * 脚手架初始化
 */
async function init(argv) {
	// check node
	checkNodeVersion()

	// 检查是否在sudo下运行，是则自动降级
	rootCheck()

	// global env
	process.env.SF_CLI_VERSION = pkg.version
	process.env.SF_CLI_NAME = pkg.name

	// command 注册
	registerCommand(argv)
}

/**
 * 检查Node环境必须大于12
 */
 function checkNodeVersion() {
	const version = process.version
	if (!semver.satisfies(version, '>=12.0.0')) {
		log.error(`required Node version must be greater than 12, current Node version: ${chalk.yellow(semver.clean(version))}`)
		exit(1)
	}
}

module.exports = init
