'use strict'

const assert = require('assert')
const _tmpl = require('./_tmpl')

/**
 * Error page
 * @memberof module:@the-/templates
 * @function errorPage
 * @param {Object} config
 * @returns {Object}
 */
function errorPage(config) {
  const { color = '#38A', icon, pkg, style, texts, title } = config
  assert(pkg, 'pkg is required')
  assert(title, 'title is required')
  assert(texts, 'texts is required')
  return {
    data: {
      color,
      icon,
      pkg,
      style,
      texts,
      title,
    },
    force: true,
    mode: '444',
    tmpl: _tmpl('error_page.hbs'),
  }
}

module.exports = errorPage
