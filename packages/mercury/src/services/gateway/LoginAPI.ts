import axios, { AxiosPromise } from 'axios'
import { Environment, EnvironmentVariable } from '../../application/Environment'

export class LoginAPI {
  constructor(private environment: Environment) {}

  public loginUser([username, password]: string[]): () => AxiosPromise {
    const url = this.environment.get(EnvironmentVariable.API_LAYER_URL)
    return () => axios.post(`${url}/auth/login`, { username, password })
  }
}
