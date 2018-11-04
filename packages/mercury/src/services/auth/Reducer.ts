import { LOGIN_SUCESSFUL_ACTION_TYPE } from '../../components/Login/Actions'

export type AuthReducerType = {
  authToken: string | null
}

const initialState: AuthReducerType = { authToken: null }

export const AuthReducer = (state = initialState, action: { type: string; token: string }) => {
  switch (action.type) {
    case LOGIN_SUCESSFUL_ACTION_TYPE:
      return {
        ...state,
        authToken: action.token,
      }
    default:
      return state
  }
}
