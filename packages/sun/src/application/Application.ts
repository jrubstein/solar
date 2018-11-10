import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { injectable, inject, multiInject } from 'inversify'
import { ApplicationConfigurationType } from './Configuration'
import { TYPES } from '../inversify.types'
import { AuthenticationMiddleware } from '../components/authentication/AuthenticationMiddleware'
import { PublicResources, ProtectedResources } from '../Utils/Resources'
import cors from '@koa/cors'
import { Logger } from 'winston'
import { LoggerFactory } from '../Utils/LoggerFactory'
import { Server } from 'http'

@injectable()
export class Application {
  private app: Koa
  private readonly LOGGER: Logger
  private server!: Server

  constructor(
    @inject(TYPES.ApplicationConfiguration) private configuration: ApplicationConfigurationType,
    @inject(TYPES.LoggerFactory) loggerFactory: LoggerFactory,
    @multiInject(TYPES.PublicResources) private publicResources: PublicResources[],
    @multiInject(TYPES.ProtectedResources) private protectedResources: ProtectedResources[]
  ) {
    this.app = new Koa()
    this.LOGGER = loggerFactory.create('Application')
  }

  public async bootstrap() {
    this.app.use(bodyParser())
    this.app.use(
      cors({
        allowMethods: '*',
      })
    )
    this.app.use(this.handleError.bind(this))
    this.publicResources.forEach(resource => this.app.use(resource.routes))

    this.app.use(AuthenticationMiddleware(this.configuration.JWT_SECRET))
    this.protectedResources.forEach(resource => this.app.use(resource.routes))
    this.app.use(context => (context.body = '404'))
  }

  public listen(port?: number): Server {
    const serverPort = port == null ? this.configuration.PORT : port
    this.server = this.app.listen(serverPort, () => {
      this.LOGGER.info(`server is up on port ${serverPort}`)
    })
    return this.server
  }

  public tearDown() {
    this.app.removeAllListeners()
  }

  private async handleError(context: Koa.Context, next: () => {}) {
    try {
      await next()
    } catch (e) {
      this.LOGGER.error(e.message, e)
      context.body = e.message
      context.status = e.status
    }
  }
}
