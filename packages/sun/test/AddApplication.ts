import { Application } from '../src/application/Application'
import { container } from '../src/inversify.config'
import { TYPES } from '../src/inversify.types'
import { Server } from 'http'

const addApplication = () => {
  let application: Application
  let server: Server
  beforeAll(() => {
    application = container.get(TYPES.Application)
  })

  beforeEach(() => {
    application.bootstrap()
    server = application.listen(0)
  })

  afterEach(() => {
    application.tearDown()
  })

  afterAll(() => {
    server.close()
  })

  return {
    getServer() {
      return server
    },
  }
}

export { addApplication }
