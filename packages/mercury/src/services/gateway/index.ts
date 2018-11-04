import { AuthorizationService } from '../auth/AuthorizationService'
import { Gateway } from './Gateway'
import { UserAPI } from './UserAPI'
import { LoginAPI } from './LoginAPI'
import { Environment } from '../../application/Environment'

export { Gateway } from './Gateway'

export const createGateway = (environment: Environment, authorizationService: AuthorizationService) => {
  return new Gateway(new UserAPI(environment, authorizationService), new LoginAPI(environment))
}
