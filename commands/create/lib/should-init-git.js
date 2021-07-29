'use strict'

const { env } = require('@sfadminltd/utils')
const { hasProjectGit } = require('@sfadminltd/utils/lib/env')

exports.shouldInitGit = function(cliOptions, cwd) {
  // git command invalid
  if (!env.hasGit()) {
    return false
  }
  // -git
  if (typeof cliOptions.git === 'boolean') {
    return cliOptions.git
  }
  if (cliOptions.git === 'false') {
    return false
  }
  // default: true unless already in a git repo
  return !hasProjectGit(cwd)
}