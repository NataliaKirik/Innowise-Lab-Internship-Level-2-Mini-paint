import { createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    activeTool: 'brush',
    color: '#000000',
    lineWidth: 1,
};

const slice = createSlice({
    name: 'toolSlice',
    initialState: initialState,
    reducers: {
        chooseTool(state: InitialStateType, action) {
            state.activeTool = action.payload.activeTool;
        },
        chooseColor(state: InitialStateType, action) {
            state.color = action.payload.color;
        },
        chooseLineWidth(state: InitialStateType, action) {
            state.lineWidth = action.payload.lineWidth;
        },
    },
});

export const toolSlice = slice.reducer;
export const { chooseTool, chooseColor, chooseLineWidth } = slice.actions;

//types
type InitialStateType = {
    activeTool: string;
    color: string;
    lineWidth: number;
};
