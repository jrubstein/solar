import { LOGIN_SUCESSFUL_ACTION_TYPE, LOGOUT_ACTION_TYPE } from '../../views/Login/Actions'

export type AuthReducerType = {
  authToken: string | null
}

const initialState: AuthReducerType = { authToken: null }

export const AuthReducer = (state = initialState, action: { type: string; token: string | null }) => {
  switch (action.type) {
    case LOGIN_SUCESSFUL_ACTION_TYPE:
      return {
        ...state,
        authToken: action.token,
      }
    case LOGOUT_ACTION_TYPE:
      return {
        ...state,
        authToken: null,
      }
    default:
      return state
  }
}
