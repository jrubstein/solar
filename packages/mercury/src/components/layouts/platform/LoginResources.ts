// import Router from 'koa-router'
// import Koa from 'koa'
// import { injectable } from 'inversify'
// import { PublicResources } from '../../../Utils/Resources';
// import { loginTemplate } from '../templates/html';

// @injectable()
// export class LoginResources implements PublicResources {
//     private router: Router

//     constructor() {
//         this.router = new Router({prefix: '/login'})
//         this.router.get('/', this.login.bind(this))
//     }

//     get routes(): Koa.Middleware {
//         return this.router.routes()
//     }

//     private async login(context: Koa.Context): Promise<void> {
//         context.body = loginTemplate()
//         context.status = 200
//     }
// }