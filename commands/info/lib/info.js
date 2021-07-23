'use strict'

const envinfo = require('envinfo')
const { log, chalk } = require('@sfadminltd/utils')

async function getEnvInfo() {
	console.log(chalk.cyan(chalk.bold('\nEnvironment Info:')))
  const info = await envinfo.run(
    {
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      npmGlobalPackages: ['@sfadminltd/cli']
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true
    }
  )
	console.log(info)
}

module.exports = (...args) => {
  return getEnvInfo(...args).catch((err) => {
    log.error(`get env info error, reason: ${err}`)
  })
}
