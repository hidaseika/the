/**
 * Pon dev tasks
 * @file Ponfile
 * @see https://gitlab.com/realglobe-Inc/pon
 */

const pon = require('pon')
const pkgSync = require('./misc/tasks/pkgSync')
const pkgRun = require('./misc/tasks/pkgRun')
const pkgInstall = require('./misc/tasks/pkgInstall')
const pkgPublish = require('./misc/tasks/pkgPublish')
const theCode = require('@the-/code/pon')
const { mocha } = require('pon-task-dev')
const {
  command: {
    spawn: { npx },
  },
} = require('pon-task-basic')

const { cwd, tasks } = require('./Ponfile')
const eslint = (dirname, options = {}) => {
  const { fix = false } = options
  return npx(
    'eslint',
    __dirname,
    '--cache',
    '--ext',
    '.jsx,.js',
    ...(fix ? ['--fix'] : []),
  )
}
const SUB_PACKAGES = 'packages/*/package.json'

module.exports = pon({
  // -----------------------------------
  // Meta info
  // -----------------------------------
  ...{
    $cwd: cwd,
    $dev: true,
  },

  // -----------------------------------
  // Eslint
  // -----------------------------------
  ...{
    'eslint:check': eslint(__dirname),
    'eslint:fix': eslint(__dirname, { fix: true }),
  },

  // -----------------------------------
  // From Ponfile.js
  // -----------------------------------
  ...tasks,
  ...{
    'pkg:sync': pkgSync('package.json', SUB_PACKAGES),
    'pkg:publish': pkgPublish(SUB_PACKAGES),
    'pkg:run:build': pkgRun(SUB_PACKAGES, 'build'),
    'pkg:install': pkgInstall(SUB_PACKAGES),
    'pkg:run:doc': pkgRun(SUB_PACKAGES, 'doc'),
    'pkg:run:test': pkgRun(SUB_PACKAGES, 'test'),
  },

  // -----------------------------------
  // Format Tasks
  // -----------------------------------
  ...{
    'format:root': theCode(['.*.bud', '.travis.yml', '+(misc)/**/*.*']),
    'format:packages': theCode(
      [
        'packages/*/+(bin|example|doc|lib|misc|test|handy|presets)/**/+(*.js|*.jsx)',
        'packages/*/+(bin|example|doc|lib|misc|test|handy|presets)/**/.*.bud',
        'packages/*/.*.bud',
      ],
      {
        ignore: [
          '**/node_modules/**/*.*',
          '**/shim/**/*.*',
          '**/tmp/**/*.*',
          '**/demo/bundle.js',
          '**/var/**/*.*',
        ],
      },
    ),
  },

  // -----------------------------------
  // Test Tasks
  // -----------------------------------
  ...{
    'test:root': mocha('test/**/*Test.js'),
  },
  // -----------------------------------
  // Main Tasks
  // -----------------------------------
  ...{
    format: ['format:root', 'format:packages'],
    prepare: [...tasks.prepare, 'pkg:sync', 'lint'],
    install: ['pkg:install'],
    lint: ['eslint:fix', 'eslint:check'],
    build: [...tasks.build, 'pkg:run:build', 'format'],
    doc: ['pkg:run:doc'],
    test: ['test:root', 'pkg:run:test'],
    publish: ['pkg:sync', 'pkg:publish'],
  },
  // -----------------------------------
  // Aliases
  // -----------------------------------
  ...{
    /** Shortcut for 'format` task */
    f: 'format',
    /** Shortcut for 'test` task */
    t: 'test',
    /** Shortcut for 'lint` task */
    l: 'lint',
  },
})
