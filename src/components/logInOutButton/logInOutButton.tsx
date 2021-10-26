import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { RootStateType } from '../../redux/reducers/rootReducer';
import { authActionTypes } from '../../redux/types/actionTypes';

const LogInOutButton = () => {
    const isAuth = useSelector<RootStateType, boolean>((state) => state.auth.isAuth);
    const dispatch = useDispatch();
    const onLogOutClick = () => {
        dispatch({ type: authActionTypes.LOG_OUT });
    };

    return (
        <>
            {isAuth ? (
                <Button variant={'contained'} type={'submit'} onClick={onLogOutClick}>
                    Log out
                </Button>
            ) : null}
        </>
    );
};

export default LogInOutButton;
