import { appActionTypes, authActionTypes, galleryActionTypes } from './actionTypes';

//app
export type statusType = 'idle' | 'loading';
export type setStatusActionType = { type: typeof appActionTypes.SET_STATUS; payload: { status: statusType } };
type setErrorActionType = { type: typeof appActionTypes.SET_ERROR; errorMessage: string };
export type appActionsType = setStatusActionType | setErrorActionType;
export type appInitialState = {
    error: null | string;
    status: 'idle' | 'loading';
};
export type sagaPayloadType = {
    type: appActionsType;
    payload: {
        email: string;
        password: string;
    };
};

//auth
export type setAuthUserData = {
    type: typeof authActionTypes.SET_USER_DATA;
    payload: { email: string | null; uid: string | null; isAuth: boolean };
};
export type authAction = {
    payload: { email: string; password: string };
};
export type authInitialState = {
    userEmail: null | string;
    uid: null | string;
    isAuth: boolean;
};

//gallery
type setUsersEmailActionType = { type: typeof galleryActionTypes.SET_USERS_EMAIL; userEmails: [] };
type setSelectedUserActionType = { type: typeof galleryActionTypes.SET_SELECTED_USER; value: string };
type setImagesActionType = { type: typeof galleryActionTypes.SET_IMAGES; arts: [] };
export type galleryActionsType = setUsersEmailActionType | setSelectedUserActionType | setImagesActionType;
export type galleryInitialState = {
    usersEmail: string[];
    selectedUserEmail: string;
    images: [];
};
