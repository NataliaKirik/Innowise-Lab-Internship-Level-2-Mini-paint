import { call, put, takeEvery } from 'redux-saga/effects';
import { appActionTypes, authActionTypes } from '../types/actionTypes';
import { User } from '@firebase/auth-types';
import { loginUser, logOutUser, registerUser } from '../../services/authService';
import { sagaPayloadType } from '../types/types';
import { appStatus } from '../actions/appAction';
import { setAuthUserData } from '../actions/authActions';

function* registerSaga({ payload }: sagaPayloadType) {
    const { email, password } = payload;
    try {
        yield put(appStatus('loading'));
        const userData: User = yield call(registerUser, email, password);
        const userEmail = userData.email;
        const userUid = userData.uid;
        yield put(setAuthUserData(userEmail, userUid, true));
        yield put(appStatus('idle'));
    } catch (error) {
        yield put(appStatus('idle'));
        const errorMessage = (error as Error)?.message;
        yield put({
            type: appActionTypes.SET_ERROR,
            errorMessage,
        });
    }
}

function* loginSaga({ payload }: sagaPayloadType) {
    const { email, password } = payload;
    try {
        yield put(appStatus('loading'));
        const userData: User = yield call(loginUser, email, password);
        const userEmail = userData.email;
        const userUid = userData.uid;
        yield put(setAuthUserData(userEmail, userUid, true));
        yield put(appStatus('idle'));
    } catch (error) {
        yield put(appStatus('idle'));
        const errorMessage = (error as Error)?.message;
        yield put({
            type: appActionTypes.SET_ERROR,
            errorMessage,
        });
    }
}

function* logOutSaga() {
    yield put(appStatus('loading'));
    try {
        yield call(logOutUser);
        yield put(setAuthUserData(null, null, false));
        yield put(appStatus('idle'));
    } catch (error) {
        yield put(appStatus('idle'));
        const errorMessage = (error as Error)?.message;
        yield put({
            type: appActionTypes.SET_ERROR,
            errorMessage,
        });
    }
}

export function* authWatcher(): Generator {
    yield takeEvery(authActionTypes.REGISTER, registerSaga);
    yield takeEvery(authActionTypes.LOGIN, loginSaga);
    yield takeEvery(authActionTypes.LOG_OUT, logOutSaga);
}
