import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { setError, startLoading, stopLoading } from './appSlice';
import { dataBase } from '../../firebase/firebase';

export const getUsers = createAsyncThunk('gallerySlice/getUsers', async (_, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading('loading'));
        const querySnapshot = await getDocs(query(collection(dataBase, 'artCollection')));
        thunkAPI.dispatch(stopLoading('idle'));
        return querySnapshot.docs.map((doc) => {
            return doc.data().userEmail;
        });
    } catch (error) {
        const message = (error as Error).message;
        thunkAPI.dispatch(stopLoading('idle'));
        thunkAPI.dispatch(setError(message));
    }
});

export const getArt = createAsyncThunk('gallery/getArt', async (userEmail: string, thunkAPI) => {
    try {
        thunkAPI.dispatch(startLoading('loading'));
        let q = await query(collection(dataBase, 'artCollection'));
        if (userEmail) {
            q = await query(collection(dataBase, 'artCollection'), where('userEmail', '==', userEmail));
            thunkAPI.dispatch(stopLoading('idle'));
        }
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => {
            return {
                image: doc.data().canvasDataUrl,
            };
        });
    } catch (error) {
        const message = (error as Error).message;
        thunkAPI.dispatch(stopLoading('idle'));
        thunkAPI.dispatch(setError(message));
    }
});

export const saveArt = createAsyncThunk(
    'gallery/saveArt',
    async ({ userEmail, userId, canvasDataUrl }: saveArtParamsType, thunkAPI) => {
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
        setSelectedUser(state: InitialStateType, { payload }) {
            state.selectedUser = payload;
        },
    },
    extraReducers: (builder) => {
        //??
        builder.addCase(getUsers.fulfilled, (state: InitialStateType, { payload }: PayloadAction<any>) => {
            state.usersEmail = payload;
        });
        builder.addCase(getArt.fulfilled, (state: InitialStateType, { payload }: PayloadAction<any>) => {
            state.images = payload;
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
type saveArtParamsType = {
    userEmail: string | null;
    userId: string | null;
    canvasDataUrl: string;
};
