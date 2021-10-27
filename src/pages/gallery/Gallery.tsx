import React, { SyntheticEvent, useEffect } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import style from './gallery.module.scss';
import { RootStateType } from '../../redux/reducers/rootReducer';
import { galleryActionTypes } from '../../redux/types/actionTypes';

export const Gallery = () => {
    const dispatch = useDispatch();
    const userEmails = useSelector<RootStateType, string[]>((state) => state.gallery.usersEmail);
    const uniqueUsersEmails = userEmails.filter(function (item, index) {
        return userEmails.indexOf(item) == index;
    });
    const usersEmailsLabel = uniqueUsersEmails.map((e) => {
        return {
            label: e,
            id: e,
        };
    });
    const images = useSelector<RootStateType, []>((state) => state.gallery.images);
    const selectedUserEmail = useSelector<RootStateType, string>((state) => state.gallery.selectedUserEmail);
    const onInputChange = (event: SyntheticEvent, value: string) => {
        dispatch({
            type: galleryActionTypes.SET_SELECTED_USER,
            value,
        });
    };

    useEffect(() => {
        dispatch({ type: galleryActionTypes.GET_USER_EMAILS });
    }, []);

    useEffect(() => {
        dispatch({
            type: galleryActionTypes.GET_ART,
            payload: { selectedUserEmail },
        });
    }, [selectedUserEmail]);

    return (
        <>
            <Autocomplete
                disablePortal
                options={usersEmailsLabel}
                renderInput={(params) => <TextField {...params} label="Select user" />}
                onInputChange={onInputChange}
                value={{
                    label: selectedUserEmail,
                    id: selectedUserEmail,
                }}
                className={style.inputSelect}
            />
            <div className={style.imageWrapper}>
                {images.map(({ image, id }) => (
                    <img src={image} alt={id} key={id} />
                ))}
            </div>
        </>
    );
};
