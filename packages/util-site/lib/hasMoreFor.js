/**
 * Has more for counts
 * @memberof module:@the-/util-site
 * @function hasMoreFor
 */
'use strict'

/** @lends module:@the-/util-site.hasMoreFor */
function hasMoreFor(counts) {
  if (!counts) {
    return false
  }
  const { length, offset, total } = counts
  return offset + length < total
}

module.exports = hasMoreFor
