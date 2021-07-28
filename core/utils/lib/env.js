'use strict'

const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')

let _hasYarn
let _hasGit
let _hasDocker

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

exports.hasDocker = () => {
  if (_hasDocker != null) {
    return _hasDocker
  }
  try {
    execSync('docker --version', { stdio: 'ignore' })
    return (_hasDocker = true)
  } catch (e) {
    return (_hasDocker = false)
  }
}

exports.hasProjectNpm = (cwd) => {
  const lockFile = path.join(cwd, 'package-lock.json')
  const result = fs.existsSync(lockFile)
  return result
}

exports.tryRun = (cmd) => {
  try {
    return execSync(cmd, {
      stdio: [0, 'pipe', 'ignore'],
      timeout: 10000
    }).toString().trim()
  } catch(e) {
    return ''
  }
}

// OS
exports.isWindows = process.platform === 'win32'
exports.isMacintosh = process.platform === 'darwin'
exports.isLinux = process.platform === 'linux'
