import { appActionTypes } from '../types/actionTypes';
import { appActionsType, appInitialState } from '../types/types';

const initialState: appInitialState = {
    error: null,
    status: 'idle',
};

export function appReducer(state: appInitialState = initialState, action: appActionsType) {
    switch (action.type) {
        case appActionTypes.SET_ERROR:
            return {
                ...state,
                error: action.errorMessage,
            };
        case appActionTypes.SET_STATUS:
            debugger;
            return {
                ...state,
                status: action.payload.status,
            };
    }
    return state;
}
