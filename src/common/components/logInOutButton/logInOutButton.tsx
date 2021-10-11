import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType, useAppDispatch } from '../../../app/store';
import { Button } from '@mui/material';
import { logOutUser } from '../../../features/loginSlice';

const LogInOutButton = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);
    const dispatch = useAppDispatch();
    const onLogOutClick = () => {
        dispatch(logOutUser());
        debugger;
    };

    return (
        <>
            {isLoggedIn ? (
                <Button variant={'contained'} type={'submit'} onClick={onLogOutClick}>
                    Log out
                </Button>
            ) : null}
        </>
    );
};

export default LogInOutButton;
