import { authActionTypes } from '../types/actionTypes';
import { authInitialState, setAuthUserData } from '../types/types';

const initialState: authInitialState = {
    userEmail: null,
    uid: null,
    isAuth: false,
};

export function authReducer(state: authInitialState = initialState, action: setAuthUserData) {
    switch (action.type) {
        case authActionTypes.SET_USER_DATA:
            return {
                ...state,
                userEmail: action.payload.email,
                uid: action.payload.uid,
                isAuth: action.payload.isAuth,
            };
    }
    return state;
}
