import React, { useEffect } from 'react';
import { AppRootStateType, useAppDispatch } from '../../redux/store';
import { getArt, getUsers, ImageType, setSelectedUser } from '../../redux/features/gallerySlice';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import s from './gallery.module.scss';

export const Gallery = () => {
    const dispatch = useAppDispatch();
    const usersEmails = useSelector<AppRootStateType, string[]>((state) => state.gallery.usersEmail);
    const uniqueUsersEmails = usersEmails.filter(function (item, index) {
        return usersEmails.indexOf(item) == index;
    });
    const usersEmailsLabel = uniqueUsersEmails.map((e) => {
        return {
            label: e,
            id: e,
        };
    });
    const images = useSelector<AppRootStateType, ImageType[]>((state) => state.gallery.images);
    const selectedUser = useSelector<AppRootStateType, string>((state) => state.gallery.selectedUser);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        dispatch(getArt(selectedUser));
    }, [selectedUser]);

    return (
        <>
            <Autocomplete
                disablePortal
                options={usersEmailsLabel}
                renderInput={(params) => <TextField {...params} label="Select user" />}
                onInputChange={(e, value) => dispatch(setSelectedUser(value))}
                value={{
                    label: selectedUser,
                    id: selectedUser,
                }}
                className={s.inputSelect}
            />
            <div className={s.imageWrapper}>
                {images.map(({ image, id }) => (
                    <img src={image} alt={id} key={id} />
                ))}
            </div>
        </>
    );
};
