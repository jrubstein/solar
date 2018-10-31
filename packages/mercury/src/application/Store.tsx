import { createStore, applyMiddleware, compose, combineReducers } from "redux"
// import freeze from 'redux-freeze'
import { reducer as form } from 'redux-form/immutable'
import { I18NReducer } from '../components/i18n/Reducer' 
import thunk from 'redux-thunk'

// add the middlewares
let middlewares = [thunk]
const windowIfDefined = typeof window === 'undefined' ? null : window as any
const composeEnhancers = windowIfDefined.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// add the freeze dev middleware
// if (process.env.NODE_ENV !== 'production') {
//   middlewares.push(freeze);
// }

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

// export
export { store, rootStore }