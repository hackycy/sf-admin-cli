'use strict'

const pkg = require('../package.json')
const { log, chalk, semver, exit } = require('@sfadminltd/utils')
const rootCheck = require('root-check')
const leven = require('leven')
const minimist = require('minimist')

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
 * 约定：尖括号 <> 代表required，方括号 [] 代表optional
 */
function registerCommand(argv) {
	const program = require('commander')
	program
		.name(Object.keys(pkg.bin)[0])
		.version(`@sfadminltd/cli ${pkg.version}`, '-v, --version')
		.usage('<command> [options]')
		.option('-d, --debug', 'Open debug mode', false)
		.addHelpCommand(false)

	program
		.command('create <project-name>')
		.description('create a new project powered by sf-admin-cli')
		.option('-t, --taobao', 'Use taobao npm registry when fetch remote version (only for npm)', false)
		.option('-g, --git', 'Force git initialization with initial commit message')
		.option('-n, --no-git', 'Skip git initialization')
		.option('-f, --force', 'Overwrite target directory if it exists')
		.action(function(name, options) {
			if (minimist(argv.slice(3))._.length > 1) {
				log.warn('You provided more than one argument. The first one will be used as the project\'s name, the rest are ignored.')
			}
			require('@sfadminltd/create')(name, options, {
				name: pkg.name,
				version: pkg.version
			})
		})

	program
		.command('info')
		.description('print debugging information about your environment')
		.option('--depend [depends...]', 'Search specified dependency')
		.action(function(options) {
			require('@sfadminltd/info')(pkg.name, options)
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

		let suggestion = null

		availableCommands.forEach(cmd => {
			const isBestMatch = leven(cmd, cwd) < leven(suggestion || '', cwd)
			if (leven(cmd, cwd) < 3 && isBestMatch) {
				suggestion = cmd
			}
		})
		if (suggestion) {
			console.log('  ' + chalk.red(`Did you mean ${chalk.yellowBright(suggestion)}?`))
		}

		// 设置 process.exitCode 属性来告诉进程在进程正常退出时使用哪个退出码
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
		exit(1)
	}
}

module.exports = init
