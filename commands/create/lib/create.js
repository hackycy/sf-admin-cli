'use strict'

async function create() {

}

module.exports = (...args) => {
  return create(...args).catch(() => {})
}
