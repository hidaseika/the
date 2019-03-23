/**
 * Map entries with key path
 * @function keyPathMap
 * @param {string} keyPath - Attribute key path
 * @param {Object} [options={}] - Optional settings
 * @returns {function}
 * @example
 *  [{foo:{bar:10}}, {foo:{bar:20}}].map(keyPathMap('foo.bar'))
 */
'use strict'

/** @lends keyPathMap */
function keyPathMap(keyPath = '', options = {}) {
  if (arguments.length > 2) {
    throw new Error('[keyPathMap] Invalid args.')
  }

  const names = keyPath.split('.')
  return function map(v) {
    for (const name of names) {
      v = v && v[name]
    }
    return v
  }
}

module.exports = keyPathMap