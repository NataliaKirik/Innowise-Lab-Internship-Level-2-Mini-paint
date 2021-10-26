import { combineReducers } from 'redux';
import { appReducer } from './appReducer';
import { galleryReducer } from './galleryReducer';
import { authReducer } from './authReducer';

export const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    gallery: galleryReducer,
});

export type RootStateType = ReturnType<typeof rootReducer>;
