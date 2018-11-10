import * as request from 'supertest'
import { addApplication } from '../../AddApplication'
import { createUser } from '../../factories/UserTestFactory'

describe('SignupResources test', () => {
  const PREFIX: string = '/signup'
  const user = createUser()
  const app = addApplication()

  describe('POST/Register', () => {
    it('should add a new user', async () => {
      await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send(user)
        .expect(200)
    })

    it('should failed if the user is alreade added', async () => {
      const response = await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send(user)
        .expect(400)
      expect(response.text).toEqual(`${user.username} is alredy taken`)
    })

    it('should failed if the username is not an email', async () => {
      await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send({ ...user, username: 'lalalalalala' })
        .expect(400)
    })

    it('should failed if the username is too short', async () => {
      await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send({ ...user, username: 'lala' })
        .expect(400)
    })

    it('should failed if there is no username', async () => {
      await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send({ ...user, username: null })
        .expect(400)
    })

    it('should failed if there is no passowrd', async () => {
      await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send({ ...user, password: null })
        .expect(400)
    })

    it('should failed if there is too short', async () => {
      await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send({ ...user, password: 'short' })
        .expect(400)
    })

    it('should failed if there is no name', async () => {
      await request
        .agent(app.getServer())
        .post(`${PREFIX}/register`)
        .send({ ...user, name: null })
        .expect(400)
    })
  })
})
