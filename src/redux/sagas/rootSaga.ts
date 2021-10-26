import { all, spawn } from 'redux-saga/effects';
import { authWatcher } from './authSaga';

export default function* rootSaga() {
    const sagas = [authWatcher]; //sagasName

    yield all(sagas.map((s) => spawn(s)));
}
