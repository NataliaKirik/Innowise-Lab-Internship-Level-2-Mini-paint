// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// import { auth } from '../../firebase/firebase';
// import { setError, startLoading, stopLoading } from './appSlice';
//
// export const createUser = createAsyncThunk('login/createUser', async ({ email, password }: AuthType, thunkAPI) => {
//     try {
//         thunkAPI.dispatch(startLoading('loading'));
//         const userData = await createUserWithEmailAndPassword(auth, email, password);
//         const userEmail = userData.user.email;
//         const userUid = userData.user.uid;
//         thunkAPI.dispatch(stopLoading('idle'));
//         return {
//             userEmail,
//             userUid,
//             isAuth: true,
//         };
//     } catch (error: any) {
//         thunkAPI.dispatch(stopLoading('idle'));
//         thunkAPI.dispatch(setError(error.message));
//         return thunkAPI.rejectWithValue({
//             userEmail: null,
//             isAuth: false,
//         });
//     }
// });
//
// export const authUser = createAsyncThunk('login/authUser', async ({ email, password }: AuthType, thunkAPI) => {
//     try {
//         thunkAPI.dispatch(startLoading('loading'));
//         const userData = await signInWithEmailAndPassword(auth, email, password);
//         const userEmail = userData.user.email;
//         const userUid = userData.user.uid;
//         thunkAPI.dispatch(stopLoading('idle'));
//         return {
//             userEmail,
//             userUid,
//             isAuth: true,
//         };
//     } catch (error: any) {
//         thunkAPI.dispatch(stopLoading('idle'));
//         thunkAPI.dispatch(setError(error.message));
//         return thunkAPI.rejectWithValue({
//             userEmail: null,
//             isAuth: false,
//         });
//     }
// });
//
// export const logOutUser = createAsyncThunk('login/logOutUser ', async (_, thunkAPI) => {
//     thunkAPI.dispatch(startLoading('loading'));
//     signOut(auth)
//         .then(() => {
//             thunkAPI.dispatch(stopLoading('idle'));
//         })
//         .catch((error: any) => {
//             thunkAPI.dispatch(stopLoading('idle'));
//             thunkAPI.dispatch(setError(error.message));
//         });
// });
//
// const initialState: InitialStateType = {
//     userEmail: null,
//     uid: null,
//     isAuth: false,
// };
//
// const onFulfilled = (state: InitialStateType, action: any) => {
//     state.userEmail = action.payload.userEmail;
//     state.uid = action.payload.userUid;
//     state.isAuth = action.payload.isAuth;
// };
// const onRejected = (state: InitialStateType, action: any) => {
//     state.isAuth = action.payload.isAuth;
//     state.userEmail = action.payload.userEmail;
// };
//
// const slice = createSlice({
//     name: 'loginSlice',
//     initialState: initialState,
//     reducers: {
//         setNotAuth(state: InitialStateType, action) {
//             state.userEmail = action.payload.userEmail;
//             state.isAuth = action.payload.isAuth;
//         },
//     },
//     extraReducers: (builder) => {
//         builder.addCase(createUser.fulfilled, onFulfilled);
//         builder.addCase(createUser.rejected, onRejected);
//         builder.addCase(authUser.fulfilled, onFulfilled);
//         builder.addCase(authUser.rejected, onRejected);
//         builder.addCase(logOutUser.fulfilled, (state: InitialStateType, action) => {
//             state.isAuth = false;
//         });
//         builder.addCase(logOutUser.rejected, (state: InitialStateType, action: any) => {
//             state.isAuth = true;
//         });
//     },
// });
//
// export const loginSlice = slice.reducer;
// export const { setNotAuth } = slice.actions;
//
// //types
// type InitialStateType = {
//     userEmail: string | null;
//     uid: string | null;
//     isAuth: boolean;
// };
// type AuthType = {
//     email: string;
//     password: string;
// };
export {};
