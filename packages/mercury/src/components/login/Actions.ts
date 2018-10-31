export const LOGIN_SUCESSFUL_ACTION_TYPE = 'LOGIN_SUCESSFUL'
export const LOGIN_FAILED_ACTION_TYPE = 'LOGIN_FAILED'

export type LoginData = {
    user: string,
    password: string
}

export type LoginAction = {
    type: string,
    data: LoginData
}

export const LOGIN = (data: LoginData): any => {
    return (dispatch) => {
        return Promise.resolve(data).then(() => {
            dispatch(LOGIN_SUCESSFUL('user', 'token'))
        }).catch(_ => dispatch(LOGIN_FAILED()))
    }
}

export const LOGIN_SUCESSFUL = (user: any, token: string) => {
    return {
        user, token, type: LOGIN_SUCESSFUL_ACTION_TYPE,
    }
}

export const LOGIN_FAILED = () => {
    return {
        type: LOGIN_FAILED_ACTION_TYPE,
    }
}