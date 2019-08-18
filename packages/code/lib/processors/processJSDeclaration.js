'use strict'

const {
  constants: { NodeTypes },
  finder,
  parse,
} = require('@the-/ast')
const combineObjectPatternOnStatementNode = require('../ast/nodes/combineObjectPatternOnStatementNode')
const normalizeVariableDeclaratorOnStatementNode = require('../ast/nodes/normalizeVariableDeclaratorOnStatementNode')
const applyConverter = require('../helpers/applyConverter')
const contentAccess = require('../helpers/contentAccess')

/**
 * Process declarations
 * @memberof module:@the-/code.processors
 * @function processJSDeclaration
 * @param content
 * @param [options={}]
 * @returns {*}
 */
function processJSDeclaration(content, options = {}) {
  return applyConverter(
    content,
    (content) => {
      const parsed = parse(content, options)
      const { get, replace } = contentAccess(content)

      const Statements = finder.findByTypes(parsed, [
        NodeTypes.Program,
        NodeTypes.BlockStatement,
      ])

      for (const Statement of Statements) {
        const converted =
          normalizeVariableDeclaratorOnStatementNode(Statement, {
            get,
            replace,
          }) ||
          combineObjectPatternOnStatementNode(Statement, {
            get,
            replace,
          })
        if (converted) {
          return converted
        }
      }
      return content
    },
    { name: 'processJSDeclaration' },
  )
}

module.exports = processJSDeclaration
