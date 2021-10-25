import React from 'react';
import { HashRouter } from 'react-router-dom';
import Header from './components/header/Header';
import { SimpleSnackbar } from './components/errorSnackBar/ErrorSnackbar';
import Preloader from './components/preloader/Preloader';
import { Routes } from './components/routes/Routes';

function App() {
    return (
        <>
            <HashRouter>
                <Header />
                <Routes />
                <SimpleSnackbar />
                <Preloader />
            </HashRouter>
        </>
    );
}

export default App;
