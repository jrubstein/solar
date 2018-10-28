// import Router from 'koa-router'
// import Koa from 'koa'
// import { injectable } from 'inversify'
// import { PublicResources } from '../../../Utils/Resources';
// import { htmlTemplate } from '../templates/html';

// @injectable()
// export class HomePageResources implements PublicResources {
//     private router: Router

//     constructor() {
//         this.router = new Router({prefix: '/home'})
//         this.router.get('/', this.home.bind(this))
//     }

//     get routes(): Koa.Middleware {
//         return this.router.routes()
//     }

//     private async home(context: Koa.Context): Promise<void> {
//         context.body = htmlTemplate('Home page', 'This is the home page')
//         context.status = 200
//     }
// }