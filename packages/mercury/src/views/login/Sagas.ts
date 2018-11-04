import { call, put, takeLatest, getContext } from 'redux-saga/effects'
import { LOGIN_SUCESSFUL, LOGIN_FAILED, LOGIN_ACTION_TYPE, LoginAction } from './Actions'
import { PUSH } from '../../services/router/Actions'
import { Gateway } from '../../services/gateway'

function* login({ data: { username, password } }: LoginAction) {
  try {
    const gateway: Gateway = yield getContext('gateway')
    const {
      data: { token },
    } = yield call(gateway.getLoginAPI().loginUser, [username, password])

    yield put(LOGIN_SUCESSFUL(token))
    yield put(PUSH('/dashboard'))
  } catch ({ response }) {
    yield put(LOGIN_FAILED(response.data))
  }
}

function* loginSaga() {
  // Typings are not good enough. String should be valid but the types
  // do not show it
  yield takeLatest(LOGIN_ACTION_TYPE as any, login)
}

export default loginSaga
