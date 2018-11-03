import { CHANGE_LANGUAGE_ACTION_TYPE, LenguageAction } from './Actions'

export type I18NReducerType = {
    language: string
}

const initialState: I18NReducerType = {language: 'en'}

export const I18NReducer =  (state = initialState, { type, language }: LenguageAction ) => {
    switch (type) {
      case CHANGE_LANGUAGE_ACTION_TYPE:
        return {
            ...state,
            language
        }
      default:
        return state
    }
  }