import { galleryActionTypes } from '../types/actionTypes';
import { galleryActionsType, galleryInitialState } from '../types/types';

const initialState: galleryInitialState = {
    usersEmail: [],
    selectedUser: '',
    images: [],
};

export function galleryReducer(state: galleryInitialState = initialState, action: galleryActionsType) {
    switch (action.type) {
        case galleryActionTypes.SET_USERS_EMAIL:
            return {
                ...state,
                usersEmail: action.usersEmail,
            };
        case galleryActionTypes.SET_SELECTED_USER:
            return {
                ...state,
                selectedUser: action.selectedUser,
            };
        case galleryActionTypes.SET_IMAGES:
            return {
                ...state,
                images: action.images,
            };
    }
    return state;
}
