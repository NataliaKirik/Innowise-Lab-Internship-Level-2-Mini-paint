import React, { useEffect } from 'react';
import { AppRootStateType, useAppDispatch } from '../../../app/store';
import { getUsers, setSelectedUser } from '../../../features/gallerySlice';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

export const Gallery = () => {
    const dispatch = useAppDispatch();
    const usersEmails = useSelector<AppRootStateType, string[]>((state) => state.gallery.usersEmail);
    const usersEmailsLabel = usersEmails.map((e) => {
        return { label: e };
    });
    useEffect(() => {
        // getArtCollection();
        dispatch(getUsers());
    }, []);
    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={usersEmailsLabel}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Select user images" />}
                onInputChange={(e, value) => dispatch(setSelectedUser(value))}
            />
        </div>
    );
};
