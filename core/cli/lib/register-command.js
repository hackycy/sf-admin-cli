'use strict'

const pkg = require('../package.json')
const leven = require('leven')
const minimist = require('minimist')
const { log, chalk } = require('@sfadminltd/utils')

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
		.option('-t, --taobao', 'use taobao npm registry when fetch remote version (only for npm)', false)
		.option('-g, --git [message]', 'force git initialization with initial commit message')
		.option('-n, --no-git', 'skip git initialization')
		.option('-p, --split-git', 'initialize the vue and server git separately', false)
		.option('-f, --force', 'overwrite target directory if it exists')
		.action(function(name, options) {
			if (minimist(argv.slice(3))._.length > 1) {
				log.warn('You provided more than one argument. The first one will be used as the project\'s name, the rest are ignored.')
			}
			require('@sfadminltd/create')(name, options)
		})
	
	program
		.command('load')
		.description('quickly import the sql script in the folder into the database')
		.requiredOption('-u, --username <username>', 'specify MySQL username')
		.requiredOption('-p, --password <password>', 'specify MySQL password')
		.option('-e, --eval-dir [dir]', 'sql script directory, relative to the current execution directory', 'init')
		.option('-o, --host [host]', 'specify host name or IP address', 'localhost')
		.option('-p, --port [port]', 'specify the port number to try to connect to the MySQL server', '3306')
		.option('-t, --table-name [name]', 'specify the name of the database that needs to be connected, it will be created automatically if it does not exist', 'sf-admin')
		.option('-o, --overwrite', 'if the database already exists, it is forced to overwrite')
		.action(function(options) {
			require('@sfadminltd/load')(options)
		})

	program
		.command('info')
		.description('print debugging information about your environment')
		.option('--dep [deps...]', 'search specified dependency')
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
		log.verbose('Avaliable commands: ', availableCommands)

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

module.exports = registerCommand