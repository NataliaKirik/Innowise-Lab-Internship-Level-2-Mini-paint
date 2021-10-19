import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login/Login';
import { PATH } from '../common/constants/routes';
import { Gallery } from '../pages/gallery/Gallery';
import { Paint } from '../pages/paint/Paint';
import Header from '../common/components/header/Header';
import { Register } from '../pages/register/Register';
import s from './app.module.css';
import { SimpleSnackbar } from '../common/components/errorSnackBar/ErrorSnackbar';
import Preloader from '../common/components/preloader/Preloader';

function App() {
    return (
        <>
            <HashRouter>
                <Header />
                <Switch>
                    <Route exact path={['/', PATH.LOGIN]} render={() => <Login />} />
                    <Route path={PATH.REGISTER} render={() => <Register />} />
                    <Route path={PATH.GALLERY} render={() => <Gallery />} />
                    <Route path={PATH.PAINT} render={() => <Paint />} />
                </Switch>
                <SimpleSnackbar />
                <Preloader />
            </HashRouter>
        </>
    );
}

export default App;
