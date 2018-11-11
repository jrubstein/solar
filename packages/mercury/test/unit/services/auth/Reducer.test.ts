import { AuthReducer, AuthReducerType } from '../../../../src/services/auth/Reducer'
import { LOGIN_SUCESSFUL, LOGOUT } from '../../../../src/views/login/Actions'

describe('Auth reducer', () => {
  it('should return authToken null as initial state', () => {
    const state = AuthReducer({} as AuthReducerType, { type: 'sometype' } as any)
    expect(state.authToken).toBeFalsy()
  })

  it('should set authToken when action is LOGIN_SUCESSFUL_ACTION_TYPE', () => {
    const state = AuthReducer({} as AuthReducerType, LOGIN_SUCESSFUL('token'))
    expect(state.authToken).toEqual('token')
  })

  it('should unset authToken when action is LOGOUT', () => {
    const state = AuthReducer({} as AuthReducerType, LOGOUT())
    expect(state.authToken).toBeFalsy()
  })
})
