'use strict'

const envinfo = require('envinfo')
const { log, chalk, spinner } = require('@sfadminltd/utils')

async function getEnvInfo(id, { depend }) {
  console.log(chalk.red(
`
____  _____ _    ____  __  __ ___ _   _ 
/ ___||  ___/ \\  |  _ \\|  \\/  |_ _| \\ | |
\\___ \\| |_ / _ \\ | | | | |\\/| || ||  \\| |
 ___) |  _/ ___ \\| |_| | |  | || || |\\  |
|____/|_|/_/   \\_|____/|_|  |_|___|_| \\_|
`
  ))
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
    log.error('info', `${chalk.red(err)}`)
  })
}
