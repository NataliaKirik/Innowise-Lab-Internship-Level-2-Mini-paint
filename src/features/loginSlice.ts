import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';

// thunk
export const createUser = createAsyncThunk('login/createUser', async ({ email, password }: AuthType, thunkAPI) => {
    try {
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        const userEmail = userData.user.email;
        const userUid = userData.user.uid;
        return {
            userEmail,
            userUid,
        };
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ errorText: error.message });
    }
});

export const authUser = createAsyncThunk('login/authUser', async ({ email, password }: AuthType, thunkAPI) => {
    try {
        const userData = await signInWithEmailAndPassword(auth, email, password);
        const userEmail = userData.user.email;
        const userUid = userData.user.uid;
        return {
            userEmail,
            userUid,
        };
    } catch (error: any) {
        return thunkAPI.rejectWithValue({ errorText: error.message });
    }
});

const initialState: InitialStateType = {
    userEmail: null,
    uid: null,
    isAuth: false,
    errorText: null,
};

const onFulfilled = (state: InitialStateType, action: any) => {
    state.userEmail = action.payload.userEmail;
    state.uid = action.payload.userUid;
    state.isAuth = true;
};
const onRejected = (state: InitialStateType, action: any) => {
    state.isAuth = false;
    state.errorText = action.payload.errorText;
};

const slice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        setUserLogOut(state: InitialStateType) {
            state.userEmail = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, onFulfilled);
        builder.addCase(createUser.rejected, onRejected);
        builder.addCase(authUser.fulfilled, onFulfilled);
        builder.addCase(authUser.rejected, onRejected);
    },
});

export const loginSlice = slice.reducer;
export const { setUserLogOut } = slice.actions;

//types
type InitialStateType = {
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
