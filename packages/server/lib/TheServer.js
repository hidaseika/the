'use strict'

const { ARedis } = require('aredis')
const asleep = require('asleep')
const http = require('http')
const { RFunc } = require('rfunc')
const socketIO = require('socket.io')
const { unlessProduction } = require('@the-/check')
const { ThePack } = require('@the-/pack')
const theTmp = require('@the-/tmp')
const { redisAdapter } = require('./adapters')
const buildInEndpoints = require('./buildInEndpoints')
const { IOConnector } = require('./connectors')
const { ClientStatuses } = require('./constants')
const DefaultValues = require('./constants/DefaultValues')
const IOEvents = require('./constants/IOEvents')
const {
  callbacksProxy,
  ctxInjector,
  langDetector,
  serversideRendering,
  toControllerDriverFactory,
} = require('./helpers')
const ClientAccess = require('./helpers/ClientAccess')
const ClientStatusPool = require('./helpers/ClientStatusPool')
const ControllerDriverPool = require('./helpers/ControllerDriverPool')
const InfoFlusher = require('./helpers/InfoFlusher')
const MetricsCounter = require('./helpers/MetricsCounter')
const RPCKeeper = require('./helpers/RPCKeeper')
const { ConnectionStore, SessionStore } = require('./stores')
const streamDriverPool = require('./streaming/streamDriverPool')
const toStreamDriverFactory = require('./streaming/toStreamDriverFactory')
const debug = require('debug')('the:server')

/**
 * HTTP server for the-framework
 * @memberof module:@the-/server
 * @class TheServer
 * @param {Object} config
 * @param {string[]} langs - Supported langs
 * @param {string} logFile - Log file
 * @param {function[]} middlewares - Koa middlewares
 */
class TheServer extends RFunc {
  constructor(config = {}) {
    const {
      cacheDir = theTmp.generateDirSync({ prefix: 'the-server' }).path,
      controllers: Controllers = {},
      encoder = new ThePack({}),
      endpoints = {},
      html = false,
      info = {},
      infoFile = 'public/the/info.json',
      inject = () => ({}),
      langs = ['en'],
      logFile = 'var/log/the-server.log',
      middlewares = [],
      redis: redisConfig = { db: 1, host: '127.0.0.1', port: '6379' },
      rpcKeepDuration = 1000,
      sessionCleanupInterval = DefaultValues.SESSION_CLEANUP_INTERVAL,
      sessionExpireDuration = DefaultValues.SESSION_EXPIRE_DURATION,
      static: staticDir,
      streams: Streams = {},
      ...rest
    } = config
    debug('config', config)
    unlessProduction(() => {
      const restKeys = Object.keys(rest)
      if (restKeys.length > 0) {
        console.warn(`[TheServer] Unknown config: ${JSON.stringify(restKeys)}`)
      }

      const invalidLang = langs.find((lang) => /^\$/.test(lang))
      if (invalidLang) {
        throw new Error(`[TheServer] Invalid lang: ${invalidLang}`)
      }
    })

    const storage = new ARedis(redisConfig)
    const sessionStore = new SessionStore(storage, {
      cleanupInterval: sessionCleanupInterval,
      expireDuration: sessionExpireDuration,
    })
    const connectionStore = new ConnectionStore(storage)
    const ControllerDriverFactories = toControllerDriverFactory.all(
      Controllers,
      {
        inject,
        sessionStore,
      },
    )
    const prototypeCtx = {}
    const prototypeControllers = Object.assign(
      {},
      ...Object.entries(ControllerDriverFactories).map(
        ([controllerName, ControllerDriverFactory]) => ({
          [controllerName]: ControllerDriverFactory(prototypeCtx).controller,
        }),
      ),
    )
    const controllerSpecs = Object.entries(prototypeControllers).map(
      ([controllerName, controller]) => ({
        methods: Object.assign(
          {},
          ...Object.keys(controller).map((name) => ({
            [name]: { desc: `${name}` },
          })),
        ),
        name: controllerName,
      }),
    )

    const StreamDriverFactories = toStreamDriverFactory.all(Streams, {
      inject,
      sessionStore,
    })
    super({
      ...prototypeControllers,
      $endpoints: {
        ...buildInEndpoints,
        ...endpoints,
      },
      $serverMiddlewares: [
        ctxInjector((ctx) => ({
          ...inject(ctx),
          server: this,
        })),
        langDetector(langs),
        ...middlewares,
      ],
      $static: staticDir,
      logFile,
    })
    if (html) {
      const renderer = serversideRendering(html, { cacheDir, inject })
      renderer.clearCacheSync()
      this.app.use(renderer)
    }

    this.additionalInfo = info
    this.ControllerDriverFactories = ControllerDriverFactories
    this.storage = storage
    this.redisConfig = redisConfig
    this.sessionStore = sessionStore
    this.connectionStore = connectionStore
    this.controllerSpecs = controllerSpecs
    this.langs = langs
    this.handleCallback = this.handleCallback.bind(this)
    this.infoFile = infoFile
    this.streamDriverPool = streamDriverPool({})
    this.StreamDriverFactories = StreamDriverFactories
    this.rpcKeepDuration = rpcKeepDuration
    this.encoder = encoder
  }

  get closed() {
    return !!this.closeAt
  }

  createControllerDriver(controllerName, client) {
    const { ControllerDriverFactories } = this
    const ControllerDriverFactory = ControllerDriverFactories[controllerName]
    if (!ControllerDriverFactory) {
      throw new Error(`[TheServer] Unknown controller: ${controllerName}`)
    }

    if (!client) {
      throw new Error('[TheServer] client is required')
    }

    return ControllerDriverFactory({
      callbacks: callbacksProxy({
        client,
        controllerName,
        onCallback: this.handleCallback,
      }),
      client: { ...client },
    })
  }

  handleCallback({
    cid,
    controller: controllerName,
    name: handlerName,
    values,
  }) {
    const event = [
      IOEvents.CLIENT_CALLBACK,
      cid,
      controllerName,
      handlerName,
    ].join('/')
    void this.ioConnector.sendToIOClient(cid, event, values, { pack: true })
  }

  /** Server info */
  info() {
    const { metricsCounter } = this
    return {
      ...(this.additionalInfo || {}),
      alive: !this.closeAt,
      controllers: this.controllerSpecs,
      langs: this.langs,
      metrics: metricsCounter && metricsCounter.counts,
      uptime: new Date() - this.listenAt,
    }
  }

  /**
   * Close server
   * @param {...*} args - Close arguments
   * @returns {Promise<*>}
   */
  async close(...args) {
    if (this.closeAt) {
      throw new Error('[TheServer] Already closed')
    }

    const { infoFlusher, rpcKeeper } = this
    this.closeAt = new Date()
    this.listenAt = null
    void infoFlusher.stopInfoFlush().catch(() => null)
    rpcKeeper.stopAllKeepTimers()
    const closed = await super.close(...args)
    this.connectionStore.closed = true
    await asleep(100) // Wait to flush
    this.ioConnector.close()
    if (this.closeRedisAdapter) {
      await this.closeRedisAdapter()
    }

    await this.storage.quit()
    return closed
  }

  /**
   * Destroy all sessions
   * @returns {Promise<number>} Deleted count
   */
  async destroyAllSessions() {
    const { controllerDriverPool, sessionStore } = this
    await controllerDriverPool.each(async (driver) => {
      await driver.clearSession()
    })
    return sessionStore.delAll()
  }

  /**
   * Listen to port
   * @param {number} port - Port to listen
   * @returns {Promise<undefined>}
   */
  async listen(port) {
    if (this.listenAt) {
      throw new Error('[TheServer] Already listening')
    }

    this.listenAt = new Date()
    this.closeAt = null
    const server = http.createServer(this.app.callback())
    this.server = server
    const io = socketIO(server)
    const infoFlusher = InfoFlusher(this.infoFile, () => this.info())
    void infoFlusher.startInfoFlush()
    this.infoFlusher = infoFlusher
    this.closeRedisAdapter = redisAdapter(io, this.redisConfig)
    const metricsCounter = MetricsCounter()
    const clientStatusPool = ClientStatusPool()
    const controllerDriverPool = ControllerDriverPool()
    this.controllerDriverPool = controllerDriverPool
    this.metricsCounter = metricsCounter
    const { connectionStore } = this
    const clientAccess = ClientAccess({ connectionStore })
    const ioConnector = IOConnector(io, {
      connectionStore,
      encoder: this.encoder,
      onIOClientCame: async (cid, socketId, client) => {
        clientStatusPool.init(cid, socketId)
        await clientAccess.saveClientSocket(cid, socketId, client)
        const controllerNames = Object.keys(this.ControllerDriverFactories)
        for (const controllerName of controllerNames) {
          const driver = this.createControllerDriver(controllerName, client)
          const { interceptors } = driver
          await driver.reloadSession()
          interceptors.controllerDidAttach()
          metricsCounter.addControllerAttachCount(controllerName, 1)
          await driver.saveSession()
          // MEMO: ここに来なければ driver は存在しない
          controllerDriverPool.add(cid, socketId, controllerName, driver)
        }
        clientStatusPool.ready(cid, socketId)
      },
      onIOClientGone: async (cid, socketId, reason) => {
        const status = clientStatusPool.get(cid, socketId)
        if (status !== ClientStatuses.READY) {
          console.warn(
            `[TheServer] The status of connection ${cid}@${socketId} is not ready: ${status}`,
          )
        }

        // TODO Wait until onIOClientCame done
        clientStatusPool.finalize(cid, socketId)
        const { rpcKeeper } = this
        const hasConnection = await clientAccess.hasClientConnection(cid)
        if (!hasConnection) {
          console.warn('[TheServer] Connection already gone for cid:', cid)
        }

        const drivers = controllerDriverPool.getAll(cid, socketId)
        for (const [controllerName, driver] of Object.entries(drivers)) {
          const { interceptors } = driver
          try {
            await driver.reloadSession()
            await interceptors.controllerWillDetach()
            await driver.saveSession()
            metricsCounter.addControllerDetachCount(controllerName, 1)
            controllerDriverPool.del(cid, socketId, controllerName)
          } catch (e) {
            console.warn(
              `[TheServer] Failed to cleanup controller ${controllerName}`,
              e,
            )
          }
        }
        controllerDriverPool.delAll(cid, socketId)
        this.streamDriverPool.cleanup(cid)
        rpcKeeper.stopKeepTimersFor(cid)

        await clientAccess.removeClientSocket(cid, socketId, reason)
        clientStatusPool.del(cid, socketId)
      },
      onRPCAbort: async () => {
        // TODO Support aborting RPC Call
      },
      onRPCCall: async (cid, socketId, config) => {
        const { rpcKeeper } = this
        const { iid, methodName, moduleName, params } = config
        const driver = controllerDriverPool.get(cid, socketId, moduleName)
        if (!driver) {
          const status = clientStatusPool.get(cid, socketId)
          const error = new Error(
            `[@the-/server] Controller not found. moduleName: ${moduleName}, status: ${status}`,
          )
          console.error(error)
          await this.ioConnector.sendRPCError(cid, iid, [error])
          return
        }

        const { controllerName, interceptors } = driver

        rpcKeeper.startKeepTimer(cid, iid, { controllerName })
        await asleep(10 * Math.random())
        let data
        let errors
        await driver.reloadSession()
        try {
          await interceptors.controllerMethodWillInvoke({
            name: methodName,
            params,
          })
          data = await driver.invoke(methodName, params.slice(1))
          await interceptors.controllerMethodDidInvoke({
            name: methodName,
            params,
            result: data,
          })
          await driver.saveSession()
        } catch (e) {
          const error = { ...e }
          delete error.stack
          unlessProduction(() => {
            error.stack = e.stack
          })
          errors = [error]
        } finally {
          rpcKeeper.stopKeepTimerIfNeeded(cid, iid)
        }
        if (this.closed) {
          return
        }

        if (errors) {
          await this.ioConnector.sendRPCError(cid, iid, errors)
        } else {
          await this.ioConnector.sendRPCSuccess(cid, iid, data)
        }
      },
      onStreamChunk: async (cid, socketId, config) => {
        const { chunk, sid } = config
        const { stream } = this.streamDriverPool.getInstance(cid, sid)
        await stream.push(chunk)
      },
      onStreamClose: async (cid, socketId, config) => {
        await asleep(10)
        const { sid } = config
        const { stream } = this.streamDriverPool.getInstance(cid, sid)
        this.streamDriverPool.delInstance(cid, sid)
        await stream.close()
      },
      onStreamError: async (e) => {
        // TODO
        console.error('[TheServer] Stream error:', e)
      },
      onStreamFin: async (cid, socketId, config) => {
        const { sid } = config
        const exists = this.streamDriverPool.hasInstance(cid, sid)
        if (!exists) {
          // DO nothing if already gone
          return
        }

        const { stream } = this.streamDriverPool.getInstance(cid, sid)
        await stream.pushEnd()
      },
      onStreamOpen: async (cid, socketId, config) => {
        const { params, sid, streamName } = config
        const StreamDriverFactory = this.StreamDriverFactories[streamName]
        if (!StreamDriverFactory) {
          throw new Error(`[TheServer] Unknown stream: ${streamName}`)
        }

        const streamDriver = StreamDriverFactory({
          cid,
          ioConnector,
          params,
          sid,
        })
        this.streamDriverPool.setInstance(cid, sid, streamDriver)
        const { stream } = streamDriver
        await stream.open()
      },
    })
    this.rpcKeeper = RPCKeeper({
      ioConnector,
      keepDuration: this.rpcKeepDuration,
      metricsCounter,
      sendRPCKeep: (...args) => ioConnector.sendRPCKeep(...args),
    })
    this.ioConnector = ioConnector
    await new Promise((resolve) => server.listen(port, () => resolve()))
  }
}

module.exports = TheServer
