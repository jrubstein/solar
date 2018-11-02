import Router from 'koa-router'
import Koa from 'koa'
import bcrypt from 'bcrypt'
import { PublicResources } from "../../Utils/Resources"
import { injectable, inject } from 'inversify'
import { Logger } from 'winston';
import { LoggerFactory } from '../../Utils/LoggerFactory';
import { TYPES } from '../../inversify.types';


export type User = {
    username: string
    password: string
    name: string
}

export const users: User[] = []


/**
 *  Test:
 * curl -v -X POST --data '{"username":"thedude1@slacker.com", "password":"abides", "name":"Mr. Lebowski"}' http://localhost:3000/signup/register  -H 'content-type: application/json;charset=utf-8'
*/
@injectable()
export class SignupResources implements PublicResources {
    private router: Router
    private readonly LOGGER: Logger

    constructor(@inject(TYPES.LoggerFactory) loggerFactory : LoggerFactory,) {
        this.router = new Router({prefix: '/signup'})
        this.router.post('/register', this.register.bind(this))
        this.LOGGER = loggerFactory.create('SignupResources')
    }

    get routes(): Koa.Middleware {
        return this.router.routes()
    }

    // TODO JOI
    private async register(context: Koa.Context): Promise<void> {
        const { username, password, name }: User = context.request.body as User
        const encryptedPassword: string =  await bcrypt.hash(password, 5)
        if (!!users.find(user => user.username === username)) {
            this.LOGGER.info(`${username} is alredy taken`)
            context.body = `${username} is alredy taken`
            context.status = 400
        } else {
            this.LOGGER.info(`${username} is now register`)
            users.push({
                username, password: encryptedPassword, name
            })
            context.status = 200
        }
    }
}