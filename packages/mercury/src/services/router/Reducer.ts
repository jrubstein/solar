import { PUSH_ACTION_TYPE } from './Actions'

const initialState = {}

export const RouterReducer =  (state = initialState, {type, url}: any ) => {
    switch (type) {
      case PUSH_ACTION_TYPE:
        return {
            ...state,
            pushUrl: url
        }
      default:
        return state
    }
  }