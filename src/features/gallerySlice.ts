import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase/db';

export const getUsers = createAsyncThunk('gallerySlice/getUsers', async (_, thunkAPI) => {
    return getDocs(query(collection(db, 'artCollection')))
        .then(({ docs }) => {
            return docs.map((user) => user.data());
        })
        .then((users) => {
            return users.map((u) => {
                return u.userEmail;
            });
        });
});

const initialState: InitialStateType = {
    usersEmail: [],
    selectedUser: '',
};

const slice = createSlice({
    name: 'gallerySlice',
    initialState: initialState,
    reducers: {
        setSelectedUser(state: InitialStateType, action) {
            state.selectedUser = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state: InitialStateType, action: any) => {
            state.usersEmail = action.payload;
        });
    },
});

export const gallerySlice = slice.reducer;
export const { setSelectedUser } = slice.actions;

//types
type InitialStateType = {
    usersEmail: [];
    selectedUser: string;
};
