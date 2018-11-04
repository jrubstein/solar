import Router from 'koa-router'
import Koa from 'koa'
import { ProtectedResources } from '../../Utils/Resources'
import { injectable, inject } from 'inversify'
import { Logger } from 'winston'
import { LoggerFactory } from '../../Utils/LoggerFactory'
import { TYPES } from '../../inversify.types'

@injectable()
export class UserResources implements ProtectedResources {
  private router: Router
  private readonly LOGGER: Logger

  constructor(@inject(TYPES.LoggerFactory) loggerFactory: LoggerFactory) {
    this.router = new Router({ prefix: '/users' })
    this.router.get('/logged', this.logged.bind(this))
    this.LOGGER = loggerFactory.create('SignupResources')
  }

  get routes(): Koa.Middleware {
    return this.router.routes()
  }

  private async logged(context: Koa.Context): Promise<void> {
    this.LOGGER.info(`Logged user: ${context.state.user.username}`)
    context.body = context.state.user
    context.status = 200
  }
}
