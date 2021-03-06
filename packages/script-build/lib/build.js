'use strict'

const argx = require('argx')
const { existsAsync } = require('asfs')
const asleep = require('asleep')
const awatch = require('awatch')
const coz = require('coz')
const path = require('path')
const theCode = require('@the-/code')
const buildDemo = require('./builders/buildDemo')
const buildESM = require('./builders/buildESM')
const buildShim = require('./builders/buildShim')

/**
 * Build project
 * @memberof module:@the-/script-build
 * @function build
 * @param {string} [dirname=process.cwd()] - Project directory name
 * @param {Object} [options={}] - Optional settings
 * @returns {Promise}
 */
async function build(dirname = process.cwd(), options = {}) {
  const args = argx(arguments)
  options = args.pop('object') || {}
  dirname = args.shift('string') || process.cwd()
  const {
    budPattern = [
      '.*.bud',
      '+(bin|ci|doc|example|lib|misc|test|styles)/**/.*.bud',
    ],
    demoDest = 'doc/demo/bundle.js',
    demoSrc = 'doc/demo/entrypoint.jsx',
    jsPattern = '**/+(*.jsx|*.js)',
    libDir = 'lib',
    noshim = false,
    shimDir = 'shim',
    watch = false,
    watchTriggerInterval = 100,
  } = options

  const pkgPath = path.resolve(dirname, 'package.json')
  const esmShimDir = `${shimDir}/esm`

  const pkg = require(pkgPath)

  const presetsFor = ({ modules } = {}) => [
    ['@babel/preset-env', { modules }],
    ['@babel/preset-react', {}],
  ]
  const plugins = [
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-proposal-do-expressions'],
    ['@babel/plugin-transform-runtime', {}, 'the-script-build-runtime'],
  ]
  const buildBud = async () => coz.render(budPattern)
  const buildFiles = async () => {
    await theCode().format(
      [
        '*.*',
        '*.md',
        '.*.bud',
        '+(bin|doc|misc|lib|example|test)/**/*.*',
        '+(bin|doc|misc|lib|example|test)/**/.*.bud',
      ],
      {
        ignore: ['misc/mocks/**/*.*'],
      },
    )
    const libExists = await existsAsync(libDir)
    if (libExists && !noshim) {
      await buildShim(libDir, shimDir, {
        jsPattern,
        plugins,
        presets: presetsFor(),
      })

      // Generate esm shim
      await buildESM(libDir, esmShimDir, {
        jsPattern,
        plugins,
        presets: presetsFor({ modules: false }),
      })
    }
  }

  const cwd = process.cwd()
  process.chdir(dirname)

  const demoExists = await existsAsync(demoSrc)
  await buildFiles()
  await buildBud()

  const demo = async () => {
    if (process.env.NODE_ENV === 'production') {
      return
    }

    await buildDemo(demoSrc, demoDest, {
      alias: {
        [`${pkg.name}/styles`]: path.resolve(dirname, 'styles'),
        [pkg.name]: path.resolve(dirname, shimDir),
      },
      plugins,
      presets: presetsFor(),
    })
  }
  if (demoExists) {
    await demo()
  }

  if (watch) {
    let needsBuildJs = false
    let needsBuildBud = false
    await awatch(budPattern, () => {
      needsBuildBud = true
    })
    await awatch(
      jsPattern,
      () => {
        needsBuildJs = true
      },
      { cwd: libDir },
    )
    let watching = true
    while (watching) {
      try {
        if (needsBuildBud) {
          needsBuildBud = false
          const nameToDecache = Object.keys(require.cache).filter((filename) =>
            /bud$/.test(filename),
          )
          for (const name of nameToDecache) {
            delete require.cache[name]
          }
          await buildBud()
        }

        if (needsBuildJs) {
          needsBuildJs = false
          await buildFiles()
          if (demoExists) {
            await demo()
          }
        }
      } catch (e) {
        watching = false
      }
      await asleep(watchTriggerInterval)
    }
  }

  process.chdir(cwd)
}

module.exports = build
