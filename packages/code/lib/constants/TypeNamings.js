/**
 * Naming for each types
 * @memberof module:@the-/code.constants
 * @namespace TypeNamings
 */
'use strict'

const Types = require('./Types')

module.exports =
  /** @lends module:@the-/code.constants.TypeNamings */
  {
    Basenames: {
      [Types.JSON_PACKAGE_JSON]: 'package.json',
    },
    Extensions: {
      [Types.JAVA_SCRIPT]: '.js,.mjs,.jsx,.bud',
      [Types.JSON]: '.json',
      [Types.STYLE_SHEET]: '.css,.pcss',
      [Types.YAML]: '.yaml,.yml',
    },
  }