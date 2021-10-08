import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import firebase from 'firebase/compat';
import { auth } from '../firebase/firebase';
import { stat } from 'fs';

// thunk
export const createUser = createAsyncThunk('login/createUser', async ({ email, password }: AuthType, thunkAPI) => {
    return createUserWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            const userEmail = user.email;
            const userUid = user.uid;
            return {
                userEmail,
                userUid,
            };
        })
        .catch((error) => {
            return error.message;
        });
});
export const authUser = createAsyncThunk('login/authUser', async ({ email, password }: AuthType, thunkAPI) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(({ user }) => {
            const userEmail = user.email;
            const userUid = user.uid;
            return {
                userEmail,
                userUid,
            };
        })
        .catch((error) => {
            return error.message;
        });
});

const initialState: InitialStateType = {
    userName: null,
    userEmail: null,
    uid: null,
    isAuth: false,
    errorText: null,
};

const slice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        setUserLogOut(state: InitialStateType) {
            state.userName = null;
            state.userEmail = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action) => {
            if (action.payload) {
                state.userEmail = action.payload.userEmail;
                state.uid = action.payload.userUid;
                state.isAuth = true;
            } else {
                state.userEmail = null;
                state.uid = null;
                state.isAuth = false;
            }
        });
    },
});

export const loginSlice = slice.reducer;
export const { setUserLogOut } = slice.actions;

//types
type InitialStateType = {
    userName: string | null;
    userEmail: string | null;
    uid: string | null;
    isAuth: boolean;
    errorText: string | null;
};
type UserActionType = {
    userEmail: string | null;
    isAuth: boolean;
    errorText: string;
};
type AuthType = {
    email: string;
    password: string;
};
