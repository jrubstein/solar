import Router from 'koa-router'
import Koa from 'koa'
import { PublicResources } from "../../Utils/Resources"
import { injectable } from 'inversify'

@injectable()
export class AuthenticationResources implements PublicResources {
    private router: Router

    constructor() {
        this.router = new Router({prefix: '/auth'})
        this.router.post('/login', this.login.bind(this))
        this.router.post('/logout', this.logout.bind(this))
    }

    get routes(): Koa.Middleware {
        return this.router.routes()
    }

    private async login(context: Koa.Context): Promise<void> {
        // Check user is correct
        // check if password is correct
        // generate token
        // return token
        context.body = {
            token: 'Cool token'
        }
        context.status = 200
    }
    
    private async logout(context: Koa.Context): Promise<void> {
        context.body = 'logout'
        context.status = 200
    }
}