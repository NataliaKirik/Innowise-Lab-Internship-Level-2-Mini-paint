import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Login } from '../pages/login/ui/Login';
import { PATH } from '../common/constants/routes';
import { Gallery } from '../pages/gallery/ui/Gallery';
import { Paint } from '../pages/paint/ui/Paint';
import Header from '../common/components/header/Header';
import { Register } from '../pages/register/ui/Register';
import s from './app.module.css';
import { SimpleSnackbar } from '../common/components/errorSnackBar/ErrorSnackbar';

function App() {
    return (
        <div className={s.mainContainer}>
            <HashRouter>
                <Header />
                <Switch>
                    <Route exact path={['/', PATH.LOGIN]} render={() => <Login />} />
                    <Route path={PATH.REGISTER} render={() => <Register />} />
                    <Route path={PATH.GALLERY} render={() => <Gallery />} />
                    <Route path={PATH.PAINT} render={() => <Paint />} />
                </Switch>
                <SimpleSnackbar />
            </HashRouter>
        </div>
    );
}

export default App;
