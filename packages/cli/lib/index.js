'use strict'

const pkg = require('../package.json')
const { log, npm } = require('@sfadminltd/utils')
const rootCheck = require('root-check')

async function core() {
	checkVersion()

	// 检查是否在sudo下运行，是则自动降级
	rootCheck()

	await npm.getPackageLastVersion('vue')
}

/**
 * 检查当前脚手架版本号
 */
function checkVersion() {
	log.info('当前脚手架版本号:', pkg.version)
}

module.exports = core
