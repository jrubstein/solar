import { call, takeLatest, getContext } from 'redux-saga/effects'
import { GET_LOGGED_USER_ACTION_TYPE } from './Actions'
import { Gateway } from '../gateway'

function* getLoggedUser() {
  try {
    const gateway: Gateway = yield getContext('gateway')
    const response = yield call(gateway.getUserAPI().getLoggedUser())
    console.log(response.data)
  } catch (e) {
    console.log(e)
  }
}

function* userSaga() {
  // Typings are not good enough. String should be valid but the types
  // do not show it
  yield takeLatest(GET_LOGGED_USER_ACTION_TYPE as any, getLoggedUser)
}

export default userSaga
