import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
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

export const getImages = createAsyncThunk('gallery/getImages', async (userEmail: string, thunkAPI) => {
    let q = query(collection(db, 'artCollection'));
    if (userEmail) {
        q = query(collection(db, 'artCollection'), where('userEmail', '==', userEmail));
    }
    return getDocs(q)
        .then((data) => {
            return data.docs;
        })
        .then((images) => {
            return images.map((img) => {
                return {
                    id: img.id,
                    image: img.data().canvasDataUrl,
                };
            });
        });
});

const initialState: InitialStateType = {
    usersEmail: [],
    selectedUser: '',
    images: [],
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
        builder.addCase(getImages.fulfilled, (state: InitialStateType, action: any) => {
            state.images = action.payload;
        });
    },
});

export const gallerySlice = slice.reducer;
export const { setSelectedUser } = slice.actions;

//types
type InitialStateType = {
    usersEmail: [];
    selectedUser: string;
    images: ImgType[];
};
export type ImgType = {
    id: string;
    image: string;
};
