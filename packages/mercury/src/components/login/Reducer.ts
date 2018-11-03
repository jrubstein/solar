import { LOGIN_FAILED_ACTION_TYPE } from '../login/Actions'

const initialState = {error: null}

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