'use strict'

const pkg = require('../package.json')
const { log } = require('@sfadminltd/utils')
const rootCheck = require('root-check')

function core() {
	checkVersion()

	// 检查是否在sudo下运行，是则自动降级
	rootCheck()
}

/**
 * 检查当前脚手架版本号
 */
function checkVersion() {
	log.info('当前脚手架版本号:', pkg.version)
}

module.exports = core
