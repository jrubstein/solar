import 'reflect-metadata'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import serve from 'koa-static'
import compress from 'koa-compress'
import { ApplicationConfiguration } from './application/Configuration'
import path from 'path'
import send from 'koa-send'

(async () => {
    const options = {gzip: true, maxage: 0} //,immutable: true}
    const rootPath = path.join(__dirname, '..', 'assets')
    const app = new Koa()
    app.use(bodyParser())
    app.use(serve(rootPath, options))
    app.use(compress())
    
    app.use(async (context: Koa.Context, next) => {
        await next()
        if (context.method !== 'HEAD' && context.method !== 'GET') return
        await send(context, 'index.html', {...options, root: rootPath})
    })

    app.listen(ApplicationConfiguration.PORT, () => {
        console.log('server is up')
    })
})()