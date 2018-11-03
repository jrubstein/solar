import { LOGIN_FAILED_ACTION_TYPE } from '../login/Actions'

export type LoginReducerType = {
  error?: string | null
}

const initialState: LoginReducerType = {error: null}

export const LoginReducer =  (state = initialState, action: any ) => {
    switch (action.type) {
      case LOGIN_FAILED_ACTION_TYPE:
        return {
            ...state,
            authError: action.error
        }
      default:
        return state
    }
  }