import { put, takeLatest } from 'redux-saga/effects'
import { LOGIN_SUCESSFUL, LOGIN_FAILED, LOGIN_ACTION_TYPE, LoginAction } from './Actions'

function* login({ data } : LoginAction) {
    try {
    //    const user = yield call(Api.fetchUser, action.payload.userId);
       yield put(LOGIN_SUCESSFUL({data}, 'token'))
    } catch (e) {
       yield put(LOGIN_FAILED('error'))
    }
}

function* loginSaga() {
    // Typings are not good enough. String should be valid but the types
    // do not show it
    yield takeLatest(LOGIN_ACTION_TYPE as any, login);
}

export default loginSaga