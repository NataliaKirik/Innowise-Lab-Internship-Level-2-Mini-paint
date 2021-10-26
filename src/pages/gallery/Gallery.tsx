import React, { useEffect } from 'react';
import { getImages, getUsers, ImageType, setSelectedUser } from '../../redux/features/gallerySlice';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import s from './gallery.module.scss';
import { RootStateType } from '../../redux/reducers/rootReducer';

export const Gallery = () => {
    const dispatch = useDispatch();
    const usersEmails = useSelector<RootStateType, string[]>((state) => state.gallery.usersEmail);
    const uniqueUsersEmails = usersEmails.filter(function (item, index) {
        return usersEmails.indexOf(item) == index;
    });
    const usersEmailsLabel = uniqueUsersEmails.map((e) => {
        return {
            label: e,
            id: e,
        };
    });
    const images = useSelector<RootStateType, ImageType[]>((state) => state.gallery.images);
    const selectedUser = useSelector<RootStateType, string>((state) => state.gallery.selectedUser);

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
