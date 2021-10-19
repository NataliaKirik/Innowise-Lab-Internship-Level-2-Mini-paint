import { combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../features/loginSlice';
import { toolSlice } from '../features/toolSlice';
import { useDispatch } from 'react-redux';
import { gallerySlice } from '../features/gallerySlice';
import { appSlice } from '../features/appSlice';

const rootReducer = combineReducers({
    app: appSlice,
    login: loginSlice,
    toolBar: toolSlice,
    gallery: gallerySlice,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

// @ts-ignore
window.store = store;

export default store;
