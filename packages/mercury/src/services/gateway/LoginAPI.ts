import axios, { AxiosPromise } from 'axios'

export class LoginAPI {
  public loginUser([username, password]: string[]): AxiosPromise {
    return axios.post('http://localhost:3000/auth/login', { username, password })
  }
}
