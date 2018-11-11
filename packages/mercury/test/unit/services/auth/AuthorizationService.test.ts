import { AuthorizationService } from '../../../../src/services/auth/AuthorizationService'
import { MockPersistanceService } from '../../../mock/PersistanceService.mock'
import { initStore, State } from '../../../../src/application/Store'
import { PersistanceService } from '../../../../src/services/persist/LocalStorage'
import { Store } from 'redux'
import { LOGIN_SUCESSFUL } from '../../../../src/views/login/Actions'

describe('AuthorizationService test', () => {
  let authorizationService: AuthorizationService
  let token: string
  let persistance: PersistanceService
  let store: Store

  beforeAll(() => {
    token = 'token'
    persistance = new MockPersistanceService()
    persistance.persistState({ auth: { authToken: token } } as State)
    store = initStore(null as any, persistance)
  })
  describe('Subscribe/Unsubscribe', () => {
    beforeEach(() => {
      authorizationService = new AuthorizationService()
    })

    it('should initialize the current token', () => {
      authorizationService.subscribe(store)
      expect(authorizationService.getAuthToken()).toEqual(token)
    })

    it('should update the current token', () => {
      authorizationService.subscribe(store)
      store.dispatch(LOGIN_SUCESSFUL(`${token}1`))
      expect(authorizationService.getAuthToken()).toEqual(`${token}1`)
    })

    it('should update the current token', () => {
      authorizationService.subscribe(store)
      store.dispatch(LOGIN_SUCESSFUL(`${token}1`))
      expect(authorizationService.getAuthToken()).toEqual(`${token}1`)
      authorizationService.unsubscribe()
      store.dispatch(LOGIN_SUCESSFUL(`${token}2`))
      expect(authorizationService.getAuthToken()).toEqual(`${token}1`)
    })
  })
})
