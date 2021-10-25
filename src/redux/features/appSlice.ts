import { createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    error: null,
    status: 'idle',
};

const slice = createSlice({
    name: 'appSlice',
    initialState: initialState,
    reducers: {
        setError(state: InitialStateType, action) {
            state.error = action.payload;
        },
        startLoading(state: InitialStateType, action) {
            state.status = action.payload;
        },
        stopLoading(state: InitialStateType, action) {
            state.status = action.payload;
        },
    },
});

export const appSlice = slice.reducer;
export const { setError, startLoading, stopLoading } = slice.actions;

//types
type InitialStateType = {
    error: null | string;
    status: statusType;
};
export type statusType = 'idle' | 'loading';
