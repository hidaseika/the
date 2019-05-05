// Code generated by coz. DO NOT EDIT.
/**
 * @module @the-/check
 * @version 15.5.0
 * @description Check utility for the-framework
 * @typicalname check
 * @license MIT
 */
'use strict'

const canTouch_ = require('./canTouch')
const isBrowser_ = require('./isBrowser')
const isChrome_ = require('./isChrome')
const isFirefox_ = require('./isFirefox')
const isMacOS_ = require('./isMacOS')
const isProduction_ = require('./isProduction')
const isiOS_ = require('./isiOS')
const unlessProduction_ = require('./unlessProduction')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.canTouch = canTouch_
exports.isBrowser = isBrowser_
exports.isChrome = isChrome_
exports.isFirefox = isFirefox_
exports.isMacOS = isMacOS_
exports.isProduction = isProduction_
exports.isiOS = isiOS_
exports.unlessProduction = unlessProduction_

module.exports = {
  canTouch: canTouch_,
  isBrowser: isBrowser_,
  isChrome: isChrome_,
  isFirefox: isFirefox_,
  isMacOS: isMacOS_,
  isProduction: isProduction_,
  isiOS: isiOS_,
  unlessProduction: unlessProduction_,
}
