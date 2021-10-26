import { call, put, takeEvery } from 'redux-saga/effects';
import { authActionTypes } from '../types/actionTypes';
import { User } from '@firebase/auth-types';
import { loginUser, logOutUser, registerUser } from '../../services/authService';
import { sagaPayloadType } from '../types/types';

function* registerSaga({ payload }: sagaPayloadType) {
    const { email, password } = payload;
    try {
        const userData: User = yield call(registerUser, email, password);
        const userEmail = userData.email;
        const userUid = userData.uid;
        yield put({
            type: authActionTypes.SET_EMAIL,
            userEmail,
        });
        yield put({
            type: authActionTypes.SET_UID,
            userUid,
        });
        yield put({
            type: authActionTypes.SET_IS_AUTH,
            isAuth: true,
        });
    } catch (e) {
        // yield put(error); dispatchError to state
    }
}

function* loginSaga({ payload }: sagaPayloadType) {
    const { email, password } = payload;
    try {
        const userData: User = yield call(loginUser, email, password);
        const userEmail = userData.email;
        const userUid = userData.uid;
        yield put({
            type: authActionTypes.SET_EMAIL,
            userEmail,
        });
        yield put({
            type: authActionTypes.SET_UID,
            userUid,
        });
        yield put({
            type: authActionTypes.SET_IS_AUTH,
            isAuth: true,
        });
    } catch (e) {
        // yield put(error); dispatchError to state
    }
}

function* logOutSaga() {
    try {
        yield call(logOutUser);
        yield put({
            type: authActionTypes.SET_IS_AUTH,
            isAuth: false,
        });
    } catch (e) {
        // yield put(error); dispatchError to state
    }
}

export function* authWatcher(): Generator {
    yield takeEvery(authActionTypes.REGISTER, registerSaga);
    yield takeEvery(authActionTypes.LOGIN, loginSaga);
    yield takeEvery(authActionTypes.LOG_OUT, logOutSaga);
}
