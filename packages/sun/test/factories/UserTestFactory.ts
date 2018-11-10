import { User } from '../../src/components/signup/SignupResources'

export const createUser = (user: Partial<User> = {}) => {
  return {
    username: 'username@email.com',
    password: 'password',
    name: 'name',
    ...user,
  }
}
