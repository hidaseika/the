/**
 * Test for TheBodyStyle.
 * Runs with mocha.
 */
'use strict'

import { ok } from 'assert'
import React from 'react'
import { render } from '@the-/script-test'
import TheBodyStyle from '../lib/TheBodyStyle'

describe('the-body-style', () => {
  before(() => {})

  after(() => {})

  it('Render a component', () => {
    let element = render(<TheBodyStyle />)
    ok(element)
  })
})

/* global describe, before, after, it */