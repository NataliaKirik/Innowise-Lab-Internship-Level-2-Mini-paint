import React from 'react';
import { useSelector } from 'react-redux';
import { AppRootStateType } from '../../app/store';
import { Redirect } from 'react-router-dom';
import { PATH } from '../../common/constants/routes';
import Toolbar from '../../common/components/toolbar/Toolbar';
import Canvas from '../../common/components/canvas/Canvas';

export const Paint = () => {
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);

    if (!isAuth) return <Redirect to={PATH.LOGIN} />;

    return (
        <>
            <Toolbar />
            <Canvas />
        </>
    );
};
