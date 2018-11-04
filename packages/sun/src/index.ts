import { container } from './inversify.config'
import { TYPES } from './inversify.types'
import { Application } from './application/Application'
;(async () => {
  const application = container.get<Application>(TYPES.Application)
  await application.bootstrap()
  await application.listen()
})()
