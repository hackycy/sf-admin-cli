'use strict'

const { execSync } = require('child_process')

let _hasYarn
let _hasGit

exports.hasYarn = () => {
  if (_hasYarn != null) {
    return _hasYarn
  }
  try {
    execSync('yarn --version', { stdio: 'ignore' })
    return (_hasYarn = true)
  } catch (e) {
    return (_hasYarn = false)
  }
}

exports.hasGit = () => {
  if (_hasGit != null) {
    return _hasGit
  }
  try {
    execSync('git --version', { stdio: 'ignore' })
    return (_hasGit = true)
  } catch (e) {
    return (_hasGit = false)
  }
}

exports.hasProjectGit = (cwd) => {
  let result
  try {
    execSync('git status', { stdio: 'ignore', cwd })
    result = true
  } catch(e) {
    result = false
  }
  return result
}