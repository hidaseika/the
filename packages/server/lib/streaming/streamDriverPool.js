'use strict'

/**
 * @memberof module:@the-/server.helpers
 * @class StreamDriverPool
 * @inner
 */
class StreamDriverPool {
  constructor() {
    this.instances = {}
  }

  cleanup(cid) {
    const instances = this.instances[cid] || {}
    for (const [, instance] of Object.entries(instances)) {
      const { stream } = instance
      if (!stream.closed) {
        stream.abort()
      }
    }
    this.instances[cid] = null
  }

  delInstance(cid, sid) {
    this.instances[cid] = this.instances[cid] || {}
    delete this.instances[cid][sid]
  }

  getInstance(cid, sid) {
    this.instances[cid] = this.instances[cid] || {}
    const instance = this.instances[cid][sid]
    if (!instance) {
      throw new Error(`[TheServer] Stream not found for ${sid}`)
    }

    return instance
  }

  hasInstance(cid, sid) {
    const instances = this.instances[cid] || {}
    return !!instances[sid]
  }

  setInstance(cid, sid, instance) {
    this.instances[cid] = this.instances[cid] || {}
    this.instances[cid][sid] = instance
  }
}

/**
 * Stream pool
 * @memberof module:@the-/server.helpers
 * @function streamPool
 * @returns {*}
 */
function streamDriverPool(...args) {
  return new StreamDriverPool(...args)
}

module.exports = streamDriverPool
