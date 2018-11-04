import { call, put, takeLatest, getContext } from 'redux-saga/effects'
import { LOGIN_SUCESSFUL, LOGIN_FAILED, LOGIN_ACTION_TYPE, LoginAction, LOGOUT, LOGOUT_ACTION_TYPE } from './Actions'
import { PUSH } from '../../services/router/Actions'
import { Gateway } from '../../services/gateway'

function* login({ data: { username, password } }: LoginAction) {
  try {
    const gateway: Gateway = yield getContext('gateway')
    const {
      data: { token },
    } = yield call(gateway.getLoginAPI().loginUser(username, password), [])

    yield put(LOGIN_SUCESSFUL(token))
    yield put(PUSH('/dashboard'))
  } catch ({ response: { status, data } }) {
    if (status === '401') {
      yield put(LOGOUT())
      yield put(PUSH('/login'))
    }
    yield put(LOGIN_FAILED(data))
  }
}

function* logout() {
  yield put(PUSH('/login'))
}

function* loginSaga() {
  // Typings are not good enough. String should be valid but the types
  // do not show it
  yield takeLatest(LOGIN_ACTION_TYPE as any, login)
  yield takeLatest(LOGOUT_ACTION_TYPE as any, logout)
}

export default loginSaga
