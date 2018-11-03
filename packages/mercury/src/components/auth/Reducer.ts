import { LOGIN_SUCESSFUL_ACTION_TYPE } from '../login/Actions'

const initialState = {token: null}

export const AuthReducer =  (state = initialState, action: any ) => {
    switch (action.type) {
      case LOGIN_SUCESSFUL_ACTION_TYPE:
        return {
            ...state,
            authToken: action.token
        }
      default:
        return state
    }
  }