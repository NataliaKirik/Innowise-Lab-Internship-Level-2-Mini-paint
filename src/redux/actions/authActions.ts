import { createAction } from '@reduxjs/toolkit';
import { authActionTypes } from '../types/actionTypes';

export const setAuthUserData = createAction(
    authActionTypes.SET_USER_DATA,
    (email: string | null, uid: string | null, isAuth: boolean) => {
        return {
            payload: {
                email,
                uid,
                isAuth,
            },
        };
    },
);
