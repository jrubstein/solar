import { AuthorizationService } from '../auth/AuthorizationService'
import axios, { AxiosPromise } from 'axios'
import { Environment, EnvironmentVariable } from '../../application/Environment'

export class UserAPI {
  constructor(private environment: Environment, private authorizationService: AuthorizationService) {}

  public getLoggedUser = (): (() => AxiosPromise) => {
    const url = this.environment.get(EnvironmentVariable.API_LAYER_URL)
    const authorization = `Bearer ${this.authorizationService.getAuthToken()}`
    return () => {
      return axios.get(`${url}/users/logged`, {
        headers: {
          authorization,
        },
      })
    }
  }
}
