import { createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    canvas: null,
};

const slice = createSlice({
    name: 'paintSlice',
    initialState: initialState,
    reducers: {
        setStateCanvas(state: InitialStateType, action) {
            state.canvas = action.payload.canvasRef;
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(createUser.fulfilled, onFulfilled);
        // builder.addCase(createUser.rejected, onRejected);
    },
});

export const paintSlice = slice.reducer;
export const { setStateCanvas } = slice.actions;

//types
type InitialStateType = {
    canvas: null;
};
