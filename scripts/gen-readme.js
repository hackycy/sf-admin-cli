'use strict'

const { log } = require('./utils')

/**
 * 同步生成package下的README
 */
async function genDocs() {}

genDocs().catch(err => {
  log.error('gh-page', err)
  process.exit(1)
})