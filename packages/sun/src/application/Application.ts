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

@injectable()
export class Application {
    private app: Koa
    private readonly LOGGER: Logger

    constructor(
        @inject(TYPES.ApplicationConfiguration) private configuration: ApplicationConfigurationType,
        @inject(TYPES.LoggerFactory) loggerFactory : LoggerFactory,
        @multiInject(TYPES.PublicResources) private publicResources: PublicResources[],
        @multiInject(TYPES.ProtectedResources) private protectedResources: ProtectedResources[],
    ) {
        this.app = new Koa()
        this.LOGGER = loggerFactory.create('Application')
    }

    public async bootstrap() {
        this.app.use(bodyParser())
        this.app.use(cors({
            allowMethods: '*'
        }))
        this.publicResources.forEach(resource => this.app.use(resource.routes))
        
        this.app.use(AuthenticationMiddleware(this.configuration.JWT_SECRET))
        this.protectedResources.forEach(resource => this.app.use(resource.routes))
        this.app.use(context => context.body = '404')
    }
    
    public listen () {
        this.app.listen(this.configuration.PORT, () => {
            this.LOGGER.info(`server is up on port ${this.configuration.PORT}`)
        })
    }
}