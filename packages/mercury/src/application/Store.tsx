import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { reducer as form } from 'redux-form/immutable'
import { I18NReducer, I18NReducerType } from '../services/i18n/Reducer'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import loginSaga from '../components/Login/Sagas'
import { AuthReducer, AuthReducerType } from '../services/auth/Reducer'
import { LoginReducer, LoginReducerType } from '../components/login/Reducer'
import { RouterReducer, RouterReducerType } from '../services/router/Reducer'
import { FormStateMap } from 'redux-form'
import { AuthorizationService } from '../services/auth/AuthorizationService'
import userSaga from '../services/user/Sagas'
import { Gateway } from '../services/gateway'

export type StoreType = {
  i18n: I18NReducerType
  auth: AuthReducerType
  login: LoginReducerType
  router: RouterReducerType
  form: FormStateMap
}

const getInitialState = (authorizationService: AuthorizationService): Partial<StoreType> => {
  return {
    auth: {
      authToken: authorizationService.getAuthToken(),
    },
  }
}

const configureSagas = (sagaMiddleware: SagaMiddleware<any>) => {
    // Sagas
    sagaMiddleware.run(loginSaga)
    sagaMiddleware.run(userSaga)
}

export const initStore = (gateway: Gateway, authorizationService: AuthorizationService) => {
  // add the middlewares
  const sagaMiddleware = createSagaMiddleware({
    context: {
      gateway,
    },
  })
  let middlewares = [sagaMiddleware]
  const windowIfDefined = typeof window === 'undefined' ? null : (window as any)
  const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

  // apply the middleware
  let middleware = applyMiddleware(...middlewares)

  const rootStore = combineReducers({
    form,
    i18n: I18NReducer,
    auth: AuthReducer,
    login: LoginReducer,
    router: RouterReducer,
  })

  // create the store
  const store = createStore(rootStore, getInitialState(authorizationService), composeEnhancers(middleware))
  configureSagas(sagaMiddleware)
  return store
}
