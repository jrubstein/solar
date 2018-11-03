import { call, put, takeLatest } from 'redux-saga/effects'
import { LOGIN_SUCESSFUL, LOGIN_FAILED, LOGIN_ACTION_TYPE, LoginAction } from './Actions'
import { loginUser } from './LoginAPI'

function* login({ data: {username, password} } : LoginAction) {
    try {
        const {data: {token}} = yield call(loginUser, [username, password])
        yield put(LOGIN_SUCESSFUL(token))
    } catch ({response}) {
        yield put(LOGIN_FAILED(response.data))
    }
}

function* loginSaga() {
    // Typings are not good enough. String should be valid but the types
    // do not show it
    yield takeLatest(LOGIN_ACTION_TYPE as any, login);
}

export default loginSaga