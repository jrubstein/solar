import { AuthorizationService } from '../auth/AuthorizationService'
import { Gateway } from './Gateway'
import { UserAPI } from './UserAPI'
import { LoginAPI } from './LoginAPI'

export { Gateway } from './Gateway'

export const createGateway = (authorizationService: AuthorizationService) => {
    return new Gateway(
        new UserAPI(authorizationService),
        new LoginAPI(),
    )
}
