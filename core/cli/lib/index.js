'use strict'

const pkg = require('../package.json')
const { log, chalk, semver } = require('@sfadminltd/utils')
const rootCheck = require('root-check')
// const leven = require('leven')

/**
 * 脚手架初始化
 */
async function init(argv) {
	// check node
	checkNodeVersion()

	// 检查是否在sudo下运行，是则自动降级
	rootCheck()

	// command 注册
	registerCommand(argv)
}

/**
 * commander 命令注册
 */
function registerCommand(argv) {
	const program = require('commander')
	program
		.name(Object.keys(pkg.bin)[0])
		.version(`@sfadminltd/cli ${pkg.version}`, '-v, --version')
		.usage('<command> [options]')
		.option('-d, --debug', 'open debug mode', false)

	program
		.command('check')
		.description('check the latest cli version number')
		.option('-t, --taobao', 'use taobao npm registry when fetch remote version (only for npm)', false)
		.action(function() {
			process.env.SF_CLI_USE_TAOBAO_REGISTRY = this.opts().taobao
			require('@sfadminltd/check')(pkg.version, pkg.name)
		})
	
	// more help text
	program.addHelpText('after', 
	`
  Run ${chalk.greenBright(Object.keys(pkg.bin)[0] + ' <command> --help')} for detailed usage of given command.
	`)

	// 开启Debug模式
	program.on('option:debug', function() {
		log.openDebugMode(this.opts().debug)
	})

	// 监听命令不存在错误处理
	program.on('command:*', function([ cwd ]) {
		log.error(`Unknown command ${chalk.yellow(cwd)}.`)
		program.outputHelp()

		// 尝试推荐命令
		const availableCommands = program.commands.map(cmd => cmd.name())

		log.verbose('avaliable commands: ', availableCommands)

		// exit
		process.exitCode = 1
	})

	// parse
	program.parse(argv)
}

/**
 * 检查Node环境必须大于12
 */
 function checkNodeVersion() {
	const version = process.version
	if (!semver.satisfies(version, '>=12.0.0')) {
		log.error(`required Node version must be greater than 12, current Node version: ${chalk.yellow(semver.clean(version))}`)
		process.exit(1)
	}
}

module.exports = init
