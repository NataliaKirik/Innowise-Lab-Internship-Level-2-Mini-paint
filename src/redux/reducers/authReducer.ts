import { authActionTypes } from '../types/actionTypes';
import { authActionsType, authInitialState } from '../types/types';

const initialState: authInitialState = {
    userEmail: null,
    uid: null,
    isAuth: false,
};

export function authReducer(state: authInitialState = initialState, action: authActionsType) {
    switch (action.type) {
        case authActionTypes.SET_EMAIL:
            return {
                ...state,
                userEmail: action.userEmail,
            };
        case authActionTypes.SET_UID:
            return {
                ...state,
                uid: action.userUid,
            };
        case authActionTypes.SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.isAuth,
            };
    }
    return state;
}
