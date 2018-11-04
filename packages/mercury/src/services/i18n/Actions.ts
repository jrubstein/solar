export const CHANGE_LANGUAGE_ACTION_TYPE = 'CHANGE_LANGUAGE'
export type LenguageAction = {
  type: string
  language: string
}

export const CHANGE_LANGUAGE = (language: string): LenguageAction => {
  return {
    type: CHANGE_LANGUAGE_ACTION_TYPE,
    language,
  }
}
