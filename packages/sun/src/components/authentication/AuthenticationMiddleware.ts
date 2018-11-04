import Koa from 'koa'
import jsonwebtoken from 'jsonwebtoken'

const verifyToken = (token: string, secret: string) => {
  try {
    return jsonwebtoken.verify(token, secret)
  } catch (e) {
    return null
  }
}

const getToken = (context: Koa.Context) => {
  if (!context.header || !context.header.authorization) {
    context.throw(401, 'No authorization token')
  }

  const [scheme, token] = context.header.authorization.split(' ')
  if (!scheme && !token) {
    context.throw(400, 'Invalid authorization token')
  }

  if (!/^Bearer$/i.test(scheme)) {
    context.throw(400, 'Bad authorization format')
  }

  return token
}

export const AuthenticationMiddleware = (secret: string) => async (context: Koa.Context, next: () => Promise<any>) => {
  const token = getToken(context)
  const decodedToken: any = verifyToken(token, secret)
  if (!decodedToken) {
    context.throw(401, 'Invalid token')
  }

  context.state.user = decodedToken.data
  return next()
}
