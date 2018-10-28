// import Router from 'koa-router'
// import Koa from 'koa'
// import { injectable } from 'inversify'
// import { ProtectedResources } from '../../../Utils/Resources';
// import { htmlTemplate } from '../templates/html';

// @injectable()
// export class PlatformResources implements ProtectedResources {
//     private router: Router

//     constructor() {
//         this.router = new Router({prefix: '/'})
//         this.router.get('/', this.home.bind(this))
//     }

//     get routes(): Koa.Middleware {
//         return this.router.routes()
//     }

//     private async home(context: Koa.Context): Promise<void> {
//         context.body = htmlTemplate('Platform', 'Platform!')
//         context.status = 200
//     }
// }