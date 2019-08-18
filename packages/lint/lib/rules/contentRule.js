'use strict'

const { EOL } = require('os')
const path = require('path')

/**
 * Create "contentRule" lint
 * @memberof module:@the-/lint.rules
 * @function contentRule
 * @param {Object} config - Lint config
 * @param {string|RegExp} config.startsWith - Ends with
 * @param {string|RegExp} config.endsWith - Ends with
 * @returns {function()} Lint function
 */
function contentRule(config) {
  const { endsWithNewLine, maxLines, ...rest } = config

  if (Object.keys(rest).length > 0) {
    console.warn('[contentRule] Unknown options', Object.keys(rest))
  }

  return async function contentRuleCheck({ content, filename, report }) {
    if (endsWithNewLine) {
      const ok = /\r?\n$/.test(content)
      !ok &&
        report('Unexpected file end', {
          actual: content.substr(content.length - EOL.length, EOL.length),
          expect: EOL,
          where: path.resolve(filename),
        })
    }

    if (maxLines) {
      const { length: lines } = content.split(EOL)
      const ok = lines <= maxLines
      !ok &&
        report('Too many lines', {
          actual: lines,
          expect: { max: maxLines },
          where: path.resolve(filename),
        })
    }
  }
}

module.exports = contentRule
