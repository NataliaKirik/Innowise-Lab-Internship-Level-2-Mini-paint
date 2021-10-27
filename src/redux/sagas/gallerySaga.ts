import { call, put, takeEvery } from 'redux-saga/effects';
import { appStatus } from '../actions/appAction';
import { User } from '@firebase/auth-types';
import { appActionTypes, galleryActionTypes } from '../types/actionTypes';
import { getArt, getUsersEmail, saveArt } from '../../services/galleryService';

function* getUsersEmailSaga() {
    try {
        yield put(appStatus('loading'));
        const userEmails: User = yield call(getUsersEmail);
        yield put({
            type: galleryActionTypes.SET_USERS_EMAIL,
            userEmails,
        });
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

function* getArtSaga({ payload }: any) {
    const { selectedUserEmail } = payload;
    try {
        yield put(appStatus('loading'));
        const arts: User = yield call(getArt, selectedUserEmail);
        yield put({
            type: galleryActionTypes.SET_IMAGES,
            arts,
        });
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

function* saveArtSaga({ payload }: any) {
    const { email, uid, canvasDataUrl } = payload;
    try {
        yield put(appStatus('loading'));
        yield call(saveArt, email, uid, canvasDataUrl);
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

export function* galleryWatcher(): Generator {
    yield takeEvery(galleryActionTypes.GET_ART, getArtSaga);
    yield takeEvery(galleryActionTypes.SAVE_ART, saveArtSaga);
    yield takeEvery(galleryActionTypes.GET_USER_EMAILS, getUsersEmailSaga);
}
