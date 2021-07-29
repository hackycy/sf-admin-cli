'use strict'

const envinfo = require('envinfo')
const { log, chalk, spinner } = require('@sfadminltd/utils')

async function getEnvInfo(id, { depend }) {
  console.log(chalk.cyan(chalk.bold('\nEnvironment Info:')))
  spinner.logWithSpinner('Loading...')
  const info = await envinfo.run(
    {
      System: ['OS', 'CPU'],
      Binaries: ['Node', 'Yarn', 'npm'],
      npmPackages: `/**/{typescript,*vue*,@vue/*/,@nestjs/*/,@midwayjs/*/${
        depend && depend.length > 0 ? ',' + depend.join(',') : ''
      }}`,
      npmGlobalPackages: [id]
    },
    {
      showNotFound: true,
      duplicates: true,
      fullTree: true
    }
  )
  spinner.stopSpinner(false)
  console.log(info)
}

module.exports = (...args) => {
  return getEnvInfo(...args).catch((err) => {
    spinner.stopSpinner(false)
    log.error(`Get env info error, reason: ${err}`)
  })
}
