export const LOGIN_SUCESSFUL_ACTION_TYPE: string = 'LOGIN_SUCESSFUL'
export const LOGIN_FAILED_ACTION_TYPE: string = 'LOGIN_FAILED'
export const LOGIN_ACTION_TYPE: string = 'LOGIN'
export const LOGOUT_ACTION_TYPE: string = 'LOGOUT'

export type LoginData = {
  username: string
  password: string
}

export type LoginAction = {
  type: string
  data: LoginData
}

export const LOGIN = (loginData: LoginData): LoginAction => {
  return {
    type: LOGIN_ACTION_TYPE,
    data: {
      ...loginData,
    },
  }
}

export const LOGIN_SUCESSFUL = (token: string) => {
  return {
    token,
    type: LOGIN_SUCESSFUL_ACTION_TYPE,
  }
}

export const LOGIN_FAILED = error => {
  return {
    type: LOGIN_FAILED_ACTION_TYPE,
    error,
  }
}

export const LOGOUT = () => {
  return {
    type: LOGOUT_ACTION_TYPE,
  }
}
