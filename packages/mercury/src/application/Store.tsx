import { createStore, applyMiddleware, compose, combineReducers } from "redux"
import { reducer as form } from 'redux-form/immutable'
import { I18NReducer } from '../components/i18n/Reducer' 
import createSagaMiddleware from 'redux-saga'
import loginSaga from '../components/Login/Sagas'

// add the middlewares
const sagaMiddleware = createSagaMiddleware()
let middlewares = [sagaMiddleware]
const windowIfDefined = typeof window === 'undefined' ? null : window as any
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// apply the middleware
let middleware = applyMiddleware(...middlewares)

const rootStore = combineReducers({
    form,
    i18n: I18NReducer
})

// create the store
const store = createStore(rootStore, composeEnhancers(
    middleware
));

// Sagas
sagaMiddleware.run(loginSaga)


// export
export { store, rootStore }