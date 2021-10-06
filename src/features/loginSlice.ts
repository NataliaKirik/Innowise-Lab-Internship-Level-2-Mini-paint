import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    userName: null,
    userEmail: null,
    _id: null,
    isAuth: false,
    errorText: null,
};

const slice = createSlice({
    name: 'loginSlice',
    initialState: initialState,
    reducers: {
        setActiveUser(state: InitialStateType, action: PayloadAction<UserActionType>) {
            state.userName = action.payload.userName;
            state.userEmail = action.payload.userEmail;
        },
        setUserLogOut(state: InitialStateType) {
            state.userName = null;
            state.userEmail = null;
        },
    },
});

// thunk
export const authTh = () => {};

//types
type InitialStateType = {
    userName: string | null;
    userEmail: string | null;
    _id: string | null;
    isAuth: boolean;
    errorText: string | null;
};
type UserActionType = {
    userName: string;
    userEmail: string;
};

export const loginSlice = slice.reducer;
export const { setActiveUser, setUserLogOut } = slice.actions;
