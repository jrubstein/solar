export const PUSH_ACTION_TYPE: string = 'PUSH'

export const PUSH = (url: string) => {
  return {
    type: PUSH_ACTION_TYPE,
    url,
  }
}
