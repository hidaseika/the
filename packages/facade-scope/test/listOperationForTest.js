/**
 * Test for listOperationFor.
 * Runs with mocha.
 */
'use strict'

const {
  strict: { equal, ok },
} = require('assert')
const {
  scopes: {
    ArrayScope,
    BooleanScope,
    NumberScope,
    ScopeScope,
    StringScope,
    ValueScope,
  },
} = require('@the-/scope')
const theStore = require('@the-/store')
const listOperationFor = require('../lib/operations/listOperationFor')

describe('list-operation-for', () => {
  before(() => {})

  after(() => {})

  it('Do test', async () => {
    const store = theStore()
    ok(store)
    const x = store.load(ScopeScope, 'x')
    x.load(ArrayScope, 'entities')
    x.load(NumberScope, 'pageSize')
    x.load(NumberScope, 'pageNumber')
    x.load(StringScope, 'sort')
    x.load(BooleanScope, 'ready')
    x.load(BooleanScope, 'busy')
    x.load(ValueScope, 'filter')
    x.load(ValueScope, 'counts')
    x.load(BooleanScope, 'hasMore')

    const listOperation = listOperationFor(x)
    ok(listOperation)
    let fetched
    listOperation.setCondition({
      filter: {},
      page: { number: 2, size: 20 },
      sort: '-createdAt',
    })
    await listOperation.sync(async (condition) => {
      fetched = { condition, entities: [], meta: {} }
      return fetched
    })
    equal(fetched.condition.page.number, 2)
    equal(fetched.condition.page.size, 20)
  })
})

/* global describe, before, after, it */