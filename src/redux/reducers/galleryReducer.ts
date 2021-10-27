import { galleryActionTypes } from '../types/actionTypes';
import { galleryActionsType, galleryInitialState } from '../types/types';

const initialState: galleryInitialState = {
    usersEmail: [],
    selectedUserEmail: '',
    images: [],
};

export function galleryReducer(state: galleryInitialState = initialState, action: galleryActionsType) {
    switch (action.type) {
        case galleryActionTypes.SET_USERS_EMAIL:
            return {
                ...state,
                usersEmail: action.userEmails,
            };
        case galleryActionTypes.SET_SELECTED_USER:
            return {
                ...state,
                selectedUserEmail: action.value,
            };
        case galleryActionTypes.SET_IMAGES:
            return {
                ...state,
                images: action.arts,
            };
    }
    return state;
}
