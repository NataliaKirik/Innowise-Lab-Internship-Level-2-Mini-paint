import { createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    dataURL: '',
};

const slice = createSlice({
    name: 'canvasSlice',
    initialState: initialState,
    reducers: {
        setDataURLCanvas(state: InitialStateType, action) {
            state.dataURL = action.payload.dataURL;
        },
    },
});

export const canvasSlice = slice.reducer;
export const { setDataURLCanvas } = slice.actions;

//types
type InitialStateType = {
    dataURL: string;
};
