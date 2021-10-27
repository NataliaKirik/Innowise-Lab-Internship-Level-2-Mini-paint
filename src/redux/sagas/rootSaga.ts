import { all, spawn } from 'redux-saga/effects';
import { authWatcher } from './authSaga';
import { galleryWatcher } from './gallerySaga';

export default function* rootSaga() {
    const sagas = [authWatcher, galleryWatcher];

    yield all(sagas.map((s) => spawn(s)));
}
