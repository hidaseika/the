'use strict'

/**
 * Scope access
 * @memberof module:@the-/facade-scope
 * @function moreAccessFor
 * @param {Object} scope
 * @returns {Object} - Face object for more access
 */
function moreAccessFor(scope) {
  /**
   * @memberof module:@the-/facade-scope.moreAccessFor
   * @inner
   * @namespace moreAccess
   */
  const moreAccess = {
    /**
     * Set moreBusy flag
     * @param {boolean} moreBusy
     */
    setBusy(moreBusy) {
      scope.set({ moreBusy })
    },
    /**
     * Set hasMore flag
     * @param {boolean} hasMore
     */
    setHas(hasMore) {
      scope.set({ hasMore })
    },
    /**
     * Busy true while handling
     * @param {function()} handler
     * @returns {Promise<*>}
     */
    async busyWhile(handler) {
      moreAccess.setBusy(true)
      try {
        return await handler()
      } finally {
        moreAccess.setBusy(false)
      }
    },
  }

  Object.freeze(moreAccess)

  return moreAccess
}

module.exports = moreAccessFor
