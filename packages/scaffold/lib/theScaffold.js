/**
 * @function theScaffold
 * @param {string} type - Scaffold type
 * @param {string} dest - Destination directory path
 * @param {Object} options - Optional settings1
 * @param {boolean} [options.straight=false] - No asking.
 * @param {boolean} [options.force=false] - Force to generate scaffold.
 * @param {boolean} [options.silent=false] - Disable logs.
 * @returns {Promise}
 */
'use strict'

const argx = require('argx')
const askconfig = require('askconfig')
const filemode = require('filemode')
const fs = require('fs')
const gitconfig = require('gitconfig')
const path = require('path')
const injection = require('./data')
const listTypes = require('./listTypes')
const render = require('./render')
const tmpls = require('./tmpls')

/** @lends theScaffold */
async function theScaffold(type, dest, options = {}) {
  const args = argx(arguments)
  type = args.shift('string')
  dest = args.shift('string')
  if (!type) {
    listTypes(tmpls)
    return
  }

  if (!dest) {
    throw new Error('dest is required.')
  }

  const exists = await new Promise((resolve) =>
    fs.exists(dest, (exists) => resolve(exists)),
  )
  const skip = exists && !options.force
  if (skip) {
    throw new Error(`${dest} is already exists. Use -f option to force.`)
  }
  let user = await gitconfig.get('user')
  user = user || { name: '__user_name__' }
  let defaults = Object.assign(
    {
      github_repository: [user.name, path.basename(dest)].join('/'),
      package_description: '',
      package_name: path.basename(dest),
    },
    injection[type] || {},
  )
  let config
  if (options.straight) {
    config = Object.assign(defaults)
  } else {
    config = await askconfig(defaults)
  }
  const data = {
    author_email: user.email,
    author_name: user.name,
    author_url: user.url,
    package_unscoped_name: config.package_name.replace(/@/, ''),
    ...config,
  }

  if (!tmpls[type]) {
    throw new Error(`Unknown type: ${type}`)
  }
  let tmpl = path.resolve(__dirname, '..', tmpls[type])
  await render(tmpl, dest, data, {
    silent: options.silent,
  })
  let bins = path.join(dest, '+(ci|bin)/**/*.*')
  await filemode(bins, '755')
}

module.exports = theScaffold
