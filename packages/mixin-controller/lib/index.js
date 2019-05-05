// Code generated by coz. DO NOT EDIT.
/**
 * @module @the-/mixin-controller
 * @version 15.4.1
 * @description Mixins for the-controller
 * @typicalname mixinController
 * @license MIT
 */
'use strict'

const compose_ = require('./compose')
const helpers_ = require('./helpers')
const withAuthorized_ = require('./withAuthorized')
const withClient_ = require('./withClient')
const withDebug_ = require('./withDebug')
const withListen_ = require('./withListen')
const withPreference_ = require('./withPreference')
const withSeal_ = require('./withSeal')

// `module.exports` overrides these `exports.*`, but still needs them for lebab (https://github.com/lebab/lebab)
exports.compose = compose_
exports.helpers = helpers_
exports.withAuthorized = withAuthorized_
exports.withClient = withClient_
exports.withDebug = withDebug_
exports.withListen = withListen_
exports.withPreference = withPreference_
exports.withSeal = withSeal_

module.exports = {
  compose: compose_,
  helpers: helpers_,
  withAuthorized: withAuthorized_,
  withClient: withClient_,
  withDebug: withDebug_,
  withListen: withListen_,
  withPreference: withPreference_,
  withSeal: withSeal_,
}
