/**
 * @augments SFUProxyEdge
 * @class SFUProxyEdgeOfferer
 */
'use strict'

const SFUProxyEdge = require('./SFUProxyEdge')

/** @lends SFUProxyEdgeOfferer */
class SFUProxyEdgeOfferer extends SFUProxyEdge {
  constructor() {
    super(...arguments)
  }

  async proxyAnswer(answer) {
    const { from, pid, purpose, to } = answer
    const { connection } = this
    const proxyDesc = await connection.createAnswer()
    await this.setLocalDescription(proxyDesc)
    return { desc: proxyDesc, from, pid, purpose, sfu: true, to }
  }

  async receiveOffer(offer) {
    await this.setRemoteDescription(offer.desc)
  }
}

module.exports = SFUProxyEdgeOfferer