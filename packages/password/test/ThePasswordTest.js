/**
 * Test for ThePassword.
 * Runs with mocha.
 */
'use strict'

const { equal, ok } = require('assert')
const ThePassword = require('../lib/ThePassword')

describe('the-password', () => {
  before(() => {})

  after(() => {})

  it('Do test', () => {
    ok(ThePassword)

    const { digest, generatePassword, generateSalt } = new ThePassword()

    const salt = generateSalt()
    const password = generatePassword()
    console.time('digest')
    const hash = digest(password, salt)
    console.timeEnd('digest')
    ok(hash)
    equal(digest(password, salt), digest(password, salt))
  })
})

/* global describe, before, after, it */