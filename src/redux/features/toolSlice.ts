import { createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    activeTool: 'brush',
    outlineColor: '#000000',
    fillColor: '#FFFFFF',
    lineWidth: 1,
};

const slice = createSlice({
    name: 'toolSlice',
    initialState: initialState,
    reducers: {
        chooseTool(state: InitialStateType, action) {
            state.activeTool = action.payload.activeTool;
        },
        chooseOutlineColor(state: InitialStateType, action) {
            state.outlineColor = action.payload.color;
        },
        chooseFillColor(state: InitialStateType, action) {
            state.fillColor = action.payload.color;
        },
        chooseLineWidth(state: InitialStateType, action) {
            state.lineWidth = action.payload.lineWidth;
        },
    },
});

export const toolSlice = slice.reducer;
export const { chooseTool, chooseOutlineColor, chooseFillColor, chooseLineWidth } = slice.actions;

//types
type InitialStateType = {
    activeTool: string;
    outlineColor: string;
    fillColor: string;
    lineWidth: number;
};
