import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { AppRootStateType } from '../../redux/store';
import { PATH } from './path';
import { Login } from '../../pages/login/Login';
import { Register } from '../../pages/register/Register';
import { Gallery } from '../../pages/gallery/Gallery';
import { Paint } from '../../pages/paint/Paint';

export const Routes = () => {
    const isAuth = useSelector<AppRootStateType, boolean>((state) => state.login.isAuth);

    return (
        <>
            {isAuth ? (
                <Switch>
                    {privateRoutes.map(({ path, component }) => (
                        <Route key={path} exact path={path} component={component} />
                    ))}
                    <Redirect to={PATH.PAINT} />;
                </Switch>
            ) : (
                <Switch>
                    {publicRoutes.map(({ path, component }) => (
                        <Route key={path} exact path={path} component={component} />
                    ))}
                    <Redirect to={PATH.LOGIN} />
                </Switch>
            )}
        </>
    );
};

const publicRoutes: RouteType[] = [
    {
        path: PATH.LOGIN,
        component: Login,
    },
    {
        path: PATH.REGISTER,
        component: Register,
    },
    {
        path: PATH.GALLERY,
        component: Gallery,
    },
];
const privateRoutes: RouteType[] = [
    {
        path: PATH.PAINT,
        component: Paint,
    },
    {
        path: PATH.GALLERY,
        component: Gallery,
    },
];

type RouteType = {
    path: string;
    component: FunctionComponent;
};
