'use strict'

const { fs } = require('@sfadminltd/utils')
const path = require('path')

const tpl = 'template'
const serverTpl = 'server'
const vueTpl = 'vue'

exports.tpl = tpl
exports.serverTpl = serverTpl
exports.vueTpl = vueTpl

/**
 * 获取template文件夹下存在的模板目录，用于提示用户创建何种模板
 * @returns {string[]} preset dir name
 */
exports.loadPreset = function() {
  const result = fs.readdirSync(path.resolve(__dirname, '../', tpl))
  return result
}
