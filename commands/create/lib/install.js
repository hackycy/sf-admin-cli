'use strict'

const { execa } = require('@sfadminltd/utils')

const PACKAGE_MANAGER_CONFIG = {
  npm: {
    install: ['install', '--loglevel', 'error']
  },
  yarn: {
    install: []
  }
}

module.exports = async function install(bin, command, cwd, args) {
  await execa(
    bin,
    [...PACKAGE_MANAGER_CONFIG[bin][command], ...(args || [])],
    { cwd, stdio: 'inherit' }
  )
}
