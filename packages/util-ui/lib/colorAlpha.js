'use strict'

const { alpha: setAlpha } = require('acolor')

/**
 * Change color alpha
 * @memberof module:@the-/util-ui
 * @function colorAlpha
 * @deprecated Ues util-color instead
 * @param {string} color - Color to change
 * @param {number} [alpha=1] - Alpha value to set
 * @returns {string} Color string
 */
function colorAlpha(color, alpha) {
  return setAlpha(color, alpha)
}

module.exports = colorAlpha
