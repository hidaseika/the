/**
 * Test for newId.
 * Runs with mocha.
 */
'use strict'

const { notEqual, ok } = require('assert').strict
const newId = require('../lib/newId')

describe('new-id', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(newId())
    notEqual(newId(), newId())
  })
})

/* global describe, before, after, it */