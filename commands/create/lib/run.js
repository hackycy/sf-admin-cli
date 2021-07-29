'use strict'

const { execa } = require('@sfadminltd/utils')

/**
 * 
 * @param {string} cwd 
 * @param {string} command 
 * @param {string[]} args 
 * @returns 
 */
module.exports = function(cwd, command, args) {
  if (!args) {
    [command, ...args] = command.split(/\s+/)
  }
  return execa(command, args, { cwd })
}