import Router from 'koa-router'
import Koa from 'koa'
import bcrypt from 'bcrypt'
import { PublicResources } from "../../Utils/Resources"
import { injectable, inject } from 'inversify'
import { users, User } from '../signup/SignupResources'
import { ApplicationConfigurationType } from '../../application/Configuration'
import { TYPES } from '../../inversify.types'
import jsonwebtoken from 'jsonwebtoken'
import { LoggerFactory } from '../../Utils/LoggerFactory';
import { Logger } from 'winston';


/**
 * Test
 * curl -v -X POST --data '{"username":"thedude1@slacker.com", "password":"abides"}' http://localhost:3000/auth/login  -H 'content-type: application/json;charset=utf-8'
 */
@injectable()
export class AuthenticationResources implements PublicResources {
    private router: Router
    private readonly LOGGER: Logger

    constructor(
        @inject(TYPES.ApplicationConfiguration) private configuration: ApplicationConfigurationType,
        @inject(TYPES.LoggerFactory) loggerFactory : LoggerFactory,
    ) {
        this.router = new Router({prefix: '/auth'})
        this.router.post('/login', this.login.bind(this))
        this.router.post('/logout', this.logout.bind(this))
        this.LOGGER = loggerFactory.create('AuthenticationResources')
    }

    get routes(): Koa.Middleware {
        return this.router.routes()
    }

    // TODO JOI
    private async login(context: Koa.Context): Promise<void> {
        const {username, password} = context.request.body as Partial<User>
        const user = users.find(user => user.username === username)
        if (!user) {
            this.LOGGER.info(`${username} is invalid`)
            context.body = `${username} is invalid`
            context.status = 400
            return
        }

        if (await bcrypt.compare(password, user.password)) {
            this.LOGGER.info(`${username} just logged in`)
            context.body = {
                token: this.generateToken(user)
            }
            context.status = 200
        } else {
            this.LOGGER.info(`${username} entered a wrong password`)
            context.body = `${username} is invalid`
            context.status = 400
            return
        }    
    }
    
    private async logout(context: Koa.Context): Promise<void> {
        context.body = 'logout'
        context.status = 200
    }

    private generateToken({password, ...user}: User) {
        return jsonwebtoken.sign({
            data: user,
            exp: Math.floor(Date.now() / 1000) - (60 * 60) // 60 seconds * 60 minutes = 1 hour
          }, this.configuration.JWT_SECRET)
    }
}