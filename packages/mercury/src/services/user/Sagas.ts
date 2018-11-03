import { call, takeLatest } from 'redux-saga/effects'
import { GET_LOGGED_USER_ACTION_TYPE } from './Actions';
import { userAPI } from '../../application/Bootstrap';

function* getLoggedUser() {
    try {
        const response = yield call(userAPI.getLoggedUser)
        console.log(response)
    } catch(e) {
        console.log(e)  
    }
}

function* userSaga() {
    // Typings are not good enough. String should be valid but the types
    // do not show it
    yield takeLatest(GET_LOGGED_USER_ACTION_TYPE as any, getLoggedUser);
}

export default userSaga