import React, { useEffect } from 'react';
import { AppRootStateType, useAppDispatch } from '../../redux/store';
import { getImages, getUsers, ImgType, setSelectedUser } from '../../redux/features/gallerySlice';
import { Autocomplete, TextField } from '@mui/material';
import { useSelector } from 'react-redux';
import s from './gallery.module.scss';

export const Gallery = () => {
    const dispatch = useAppDispatch();
    const usersEmails = useSelector<AppRootStateType, string[]>((state) => state.gallery.usersEmail);
    const uniqueUsersEmails = usersEmails.filter(function (item, pos) {
        return usersEmails.indexOf(item) == pos;
    });
    const usersEmailsLabel = uniqueUsersEmails.map((e) => {
        return {
            label: e,
            id: e,
        };
    });
    const images = useSelector<AppRootStateType, ImgType[]>((state) => state.gallery.images);
    const selectedUser = useSelector<AppRootStateType, string>((state) => state.gallery.selectedUser);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        dispatch(getImages(selectedUser));
    }, [selectedUser]);

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={usersEmailsLabel}
                renderInput={(params) => <TextField {...params} label="Select user" />}
                onInputChange={(e, value) => dispatch(setSelectedUser(value))}
                value={{
                    label: selectedUser,
                    id: selectedUser,
                }}
                // isOptionEqualToValue={(option, value) => option.label === value.label}
                className={s.inputSelect}
            />
            <div className={s.imgWrapper}>
                {images.map((img) => (
                    <img src={img.image} alt={img.id} key={img.id} />
                ))}
            </div>
        </>
    );
};
