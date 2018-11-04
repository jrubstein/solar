import { AuthorizationService } from '../auth/AuthorizationService'
import axios, { AxiosPromise } from 'axios'

export class UserAPI {
  constructor(private authorizationService: AuthorizationService) {}

  public getLoggedUser = (): AxiosPromise => {
    return axios.get('http://localhost:3000/users/logged', {
      headers: {
        authorization: `Bearer ${this.authorizationService.getAuthToken()}`,
      },
    })
  }
}
