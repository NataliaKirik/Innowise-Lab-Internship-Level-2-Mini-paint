import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../../app/store';
import { Redirect } from 'react-router-dom';
import { PATH } from '../../../common/constants/routes';
import Toolbar from '../../../common/components/toolbar/Toolbar';
import Canvas from '../../../common/components/canvas/Canvas';

export const Paint = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);

    useEffect(() => {
        if (isAuth) return;
    }, [isAuth, dispatch]);

    if (!isAuth) return <Redirect to={PATH.LOGIN} />;

    return (
        <>
            <Toolbar />
            <Canvas />
        </>
    );
};
