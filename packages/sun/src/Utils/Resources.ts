import Koa from 'koa'

export interface PublicResources {
  routes: Koa.Middleware
}

export interface ProtectedResources {
  routes: Koa.Middleware
}
