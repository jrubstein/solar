import axios, { AxiosPromise } from 'axios'

export const loginUser = ([username, password]: string[]): AxiosPromise => {
    return axios.post('http://localhost:3000/auth/login', {username, password})
}