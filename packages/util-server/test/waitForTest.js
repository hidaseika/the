/**
 * Test for waitFor.
 * Runs with mocha.
 */
'use strict'

const waitFor = require('../lib/waitFor')
const { mkdirpAsync, unlinkAsync, writeFileAsync } = require('asfs')
const { ok, strictEqual: equal, deepStrictEqual: deepEqual } = require('assert')

describe('wait-for-file', () => {
  before(() => {
  })

  after(() => {
  })

  it('Do test', async () => {
    let ready = false
    setTimeout(() => {
      ready = true
    }, 100)
    await waitFor(() => ready)
  })
})

/* global describe, before, after, it */