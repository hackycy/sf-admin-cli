'use strict'

const { log } = require('@sfadminltd/utils')

/**
 * load sql script
 */
async function load() {
	
}

module.exports = (...args) => {
  return load(...args).catch((err) => {
		log.error(`Load the script error, reason: ${err}`)
  })
}

