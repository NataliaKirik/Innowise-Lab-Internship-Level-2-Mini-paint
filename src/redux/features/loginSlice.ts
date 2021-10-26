import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { setError, startLoading, stopLoading } from './appSlice';

export const createUser = createAsyncThunk('login/createUser', async ({ email, password }: AuthType, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading('loading'));
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        const userEmail = userData.user.email;
        const userUid = userData.user.uid;
        thunkAPI.dispatch(stopLoading('idle'));
        return {
            userEmail,
            userUid,
            isAuth: true,
        };
    } catch (error: any) {
        thunkAPI.dispatch(stopLoading('idle'));
        thunkAPI.dispatch(setError(error.message));
        return thunkAPI.rejectWithValue({
            userEmail: null,
            isAuth: false,
        });
    }
});

export const authUser = createAsyncThunk('login/authUser', async ({ email, password }: AuthType, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading('loading'));
        const userData = await signInWithEmailAndPassword(auth, email, password);
        const userEmail = userData.user.email;
        const userUid = userData.user.uid;
        thunkAPI.dispatch(stopLoading('idle'));
        return {
            userEmail,
            userUid,
            isAuth: true,
        };
    } catch (error) {
        thunkAPI.dispatch(stopLoading('idle'));
        const message = (error as Error).message;
        thunkAPI.dispatch(setError(message));
        return thunkAPI.rejectWithValue({
            userEmail: null,
            isAuth: false,
        });
    }
});

export const logOutUser = createAsyncThunk('login/logOutUser ', async (_, thunkAPI) => {
    thunkAPI.dispatch(startLoading('loading'));
    signOut(auth)
        .then(() => {
            thunkAPI.dispatch(stopLoading('idle'));
        })
        .catch((error) => {
            const message = (error as Error).message;
            thunkAPI.dispatch(stopLoading('idle'));
            thunkAPI.dispatch(setError(message));
        });
});

const initialState: InitialStateType = {
    userEmail: null,
    uid: null,
    isAuth: false,
};

const onFulfilled = (
    state: InitialStateType,
    { payload }: PayloadAction<{ isAuth: boolean; userEmail: string; userUid: string }>,
) => {
    state.userEmail = payload.userEmail;
    state.uid = payload.userUid;
    state.isAuth = payload.isAuth;
};
const onRejected = (state: InitialStateType, { payload }: PayloadAction<{ isAuth: boolean; userEmail: string }>) => {
    state.isAuth = payload.isAuth;
    state.userEmail = payload.userEmail;
};

const slice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        setNotAuth(state: InitialStateType, { payload }: PayloadAction<{ isAuth: boolean; userEmail: string }>) {
            state.userEmail = payload.userEmail;
            state.isAuth = payload.isAuth;
        },
    },
    extraReducers: (builder: any) => {
        builder.addCase(createUser.fulfilled, onFulfilled);
        builder.addCase(createUser.rejected, onRejected);
        builder.addCase(authUser.fulfilled, onFulfilled);
        builder.addCase(authUser.rejected, onRejected);
        builder.addCase(logOutUser.fulfilled, (state: InitialStateType) => {
            state.isAuth = false;
        });
        builder.addCase(logOutUser.rejected, (state: InitialStateType) => {
            state.isAuth = true;
        });
    },
});

export const loginSlice = slice.reducer;
export const { setNotAuth } = slice.actions;

//types
type InitialStateType = {
    userEmail: string | null;
    uid: string | null;
    isAuth: boolean;
};
type AuthType = {
    email: string;
    password: string;
};
type payloadType = { payload: { userEmail: string | null; userUid: string | null; isAuth: boolean } };
