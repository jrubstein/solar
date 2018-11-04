import Koa from 'koa'
import Joi from 'joi'

export const queryValidationMiddleware = (schema: Joi.Schema) => {
  return async (context: Koa.Context, next: () => Promise<any>) => {
    const query = context.query
    const { error, value } = Joi.validate(query, schema)
    if (!!error) {
      context.throw(400, error)
      return
    }
    context.query = value
    return next()
  }
}

export const bodyValidationMiddleware = (schema: Joi.Schema) => {
  return async (context: Koa.Context, next: () => Promise<any>) => {
    const { body } = context.request
    const { error, value } = Joi.validate(body, schema)
    if (!!error) {
      context.throw(400, error)
      return
    }
    context.request.body = value
    return next()
  }
}
