/**
 * Alias of {@memberOf module:@the-/store
 * @function create
 * @link module:@the-/store}
 */
'use strict'

const create = require('./create')
const helpers = require('./helpers')
const TheStore = require('./TheStore')

const lib = create.bind(create)

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.TheStore = TheStore
exports.helpers = helpers
exports.create = create

module.exports = Object.assign(lib, {
  TheStore,
  create,
  helpers,
})
