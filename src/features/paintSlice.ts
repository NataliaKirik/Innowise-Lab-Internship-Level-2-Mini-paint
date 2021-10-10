import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    canvas: null,
};

const slice = createSlice({
    name: 'paintSlice',
    initialState: initialState,
    reducers: {
        setStateCanvas(state: InitialStateType, action) {
            // state.canvas = action.payload...
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(createUser.fulfilled, onFulfilled);
        // builder.addCase(createUser.rejected, onRejected);
    },
});

export const paintSlice = slice.reducer;

//types
type InitialStateType = {
    canvas: null;
};
