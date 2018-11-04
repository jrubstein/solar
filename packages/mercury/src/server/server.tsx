import 'reflect-metadata'
import { ApplicationConfiguration } from './Configuration'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import Koa from 'koa'
import path from 'path'
import send from 'koa-send'
import serve from 'koa-static'

;(async () => {
  const isProduction = process.env.NODE_ENV === 'production'

  let options: { [key: string]: any } = { gzip: true, maxage: 0 }
  if (isProduction) {
    options = { gzip: true, inmutable: true }
  }

  const rootPath = path.join(__dirname, '..', '..', '..', 'assets')
  const app = new Koa()
  app.use(bodyParser())
  app.use(serve(rootPath, options))
  app.use(compress())

  app.use(async (context: Koa.Context, next) => {
    await next()
    if (context.method !== 'HEAD' && context.method !== 'GET') {
      return
    }
    try {
      await send(context, 'index.html', { ...options, root: rootPath })
    } catch (e) {
      console.log(e.message)
    }
  })

  app.listen(ApplicationConfiguration.PORT, () => {
    console.log('server is up')
  })
})()
