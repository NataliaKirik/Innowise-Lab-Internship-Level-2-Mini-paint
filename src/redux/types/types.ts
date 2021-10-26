import { appActionTypes, galleryActionTypes, authActionTypes } from './actionTypes';
import { rootReducer } from '../reducers/rootReducer';

//app
type setStatusActionType = { type: typeof appActionTypes.SET_STATUS; error: string };
type setErrorActionType = { type: typeof appActionTypes.SET_ERROR; status: string };
export type appActionsType = setStatusActionType | setErrorActionType;
export type appInitialState = {
    error: null | string;
    status: 'idle' | 'loading';
};

//auth
type setEmailActionType = { type: typeof authActionTypes.SET_EMAIL; userEmail: string };
type setUidActionType = { type: typeof authActionTypes.SET_UID; userUid: string };
type setIsAuthType = { type: typeof authActionTypes.SET_IS_AUTH; isAuth: string };
export type authActionsType = setEmailActionType | setUidActionType | setIsAuthType;
export type authAction = {
    payload: { email: string; password: string };
};
export type authInitialState = {
    userEmail: null | string;
    uid: null | string;
    isAuth: boolean;
};

//gallery
type setUsersEmailActionType = { type: typeof galleryActionTypes.SET_USERS_EMAIL; usersEmail: [] };
type setSelectedUserActionType = { type: typeof galleryActionTypes.SET_SELECTED_USER; selectedUser: string };
type setImagesActionType = { type: typeof galleryActionTypes.SET_IMAGES; images: [] };
export type galleryActionsType = setUsersEmailActionType | setSelectedUserActionType | setImagesActionType;
export type galleryInitialState = {
    usersEmail: [];
    selectedUser: string;
    images: [];
};
