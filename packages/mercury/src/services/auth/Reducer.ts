import { LOGIN_SUCESSFUL_ACTION_TYPE } from "../../components/Login/Actions";
const initialState = {authToken: null}

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