import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { startLoading, stopLoading } from './appSlice';
import { dataBase } from '../../firebase/firebase';

export const getUsers = createAsyncThunk('gallerySlice/getUsers', async (_, thunkAPI) => {
    thunkAPI.dispatch(startLoading('loading'));
    return getDocs(query(collection(dataBase, 'artCollection')))
        .then(({ docs }) => {
            return docs.map((user) => user.data());
        })
        .then((users) => {
            thunkAPI.dispatch(stopLoading('idle'));
            return users.map((u) => {
                return u.userEmail;
            });
        });
});

export const getArt = createAsyncThunk('gallery/getArt', async (userEmail: string, thunkAPI) => {
    thunkAPI.dispatch(startLoading('loading'));
    let q = query(collection(dataBase, 'artCollection'));
    if (userEmail) {
        thunkAPI.dispatch(stopLoading('idle'));
        q = query(collection(dataBase, 'artCollection'), where('userEmail', '==', userEmail));
    }
    return getDocs(q)
        .then((data) => {
            return data.docs;
        })
        .then((images) => {
            thunkAPI.dispatch(stopLoading('idle'));
            return images.map((img) => {
                return {
                    id: img.id,
                    image: img.data().canvasDataUrl,
                };
            });
        });
});

export const saveArt = createAsyncThunk(
    'gallery/saveArt',
    async (
        {
            userEmail,
            userId,
            canvasDataUrl,
        }: { userEmail: string | null; userId: string | null; canvasDataUrl: string },
        thunkAPI,
    ) => {
        const artRef = collection(dataBase, 'artCollection');
        thunkAPI.dispatch(startLoading('loading'));
        await addDoc(artRef, {
            userEmail,
            userId,
            canvasDataUrl,
        });
        thunkAPI.dispatch(stopLoading('idle'));
    },
);

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
        builder.addCase(getArt.fulfilled, (state: InitialStateType, action: any) => {
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
    images: ImageType[];
};
export type ImageType = {
    id: string;
    image: string;
};
