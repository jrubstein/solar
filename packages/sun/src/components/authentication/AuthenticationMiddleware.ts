import jwt from 'koa-jwt'

export const JWTMiddleware = (secret: string) => 
  jwt({
    secret
  }).unless({
    path: [/^\/public/]
  })