'use strict'

const NoopConverter = (v) => v
const UInt8ArrayConverter = (v) => new Uint8Array(v)

exports.NoopConverter = NoopConverter

exports.UInt8ArrayConverter = UInt8ArrayConverter

module.exports = Object.assign(
  /**
   * @memberof module:@the-/pack
   * @namespace Converters
   */
  {
    NoopConverter,
    UInt8ArrayConverter,
  },
)
