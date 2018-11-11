import { createStore, applyMiddleware, compose, combineReducers, Store } from 'redux'
import { reducer as form } from 'redux-form/immutable'
import { I18NReducer, I18NReducerType } from '../services/i18n/Reducer'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import loginSaga from '../views/Login/Sagas'
import { AuthReducer, AuthReducerType } from '../services/auth/Reducer'
import { LoginReducer, LoginReducerType } from '../views/login/Reducer'
import { RouterReducer, RouterReducerType } from '../services/router/Reducer'
import { FormStateMap } from 'redux-form'
import userSaga from '../services/user/Sagas'
import { Gateway } from '../services/gateway'
import { PersistanceService } from '../services/persist/LocalStorage'

export type State = {
  i18n: I18NReducerType
  auth: AuthReducerType
  login: LoginReducerType
  router: RouterReducerType
  form: FormStateMap
}

const getInitialState = (persistanceService: PersistanceService): Partial<State> => {
  return persistanceService.getSavedState() || {}
}

const configureSagas = (sagaMiddleware: SagaMiddleware<any>) => {
  // Sagas
  sagaMiddleware.run(loginSaga)
  sagaMiddleware.run(userSaga)
}

export const initStore = (gateway: Gateway, persistanceService: PersistanceService): Store<State> => {
  // add the middlewares
  const sagaMiddleware = createSagaMiddleware({
    context: {
      gateway,
    },
  })
  const middlewares = [sagaMiddleware]
  const windowIfDefined = typeof window === 'undefined' ? {} : (window as any)
  const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // apply the middleware
  const middleware = applyMiddleware(...middlewares)

  const rootStore = combineReducers({
    form,
    i18n: I18NReducer,
    auth: AuthReducer,
    login: LoginReducer,
    router: RouterReducer,
  })

  // create the store
  const store = createStore(rootStore, getInitialState(persistanceService), composeEnhancers(middleware))
  configureSagas(sagaMiddleware)
  return store
}
