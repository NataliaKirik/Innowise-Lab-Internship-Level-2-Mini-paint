import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat';
import { auth } from './firebase/firebase';

const Context = createContext<any>(null);

ReactDOM.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                firebase,
                auth,
            }}
        >
            <App />
        </Context.Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

reportWebVitals();
