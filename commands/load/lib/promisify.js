'use strict'

/**
 *
 * @param {Function} fn
 */
module.exports = function promisify(fn, context) {
  return (...args) => {
    return new Promise((resolve, reject) => {
      fn.call(context, ...args, function(err, result) {
        if (err) {
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
  }
}
