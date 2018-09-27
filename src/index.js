import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import firebase from 'firebase';
import config from './config';

firebase.initializeApp(config);
firebase.firestore().settings({
    timestampsInSnapshots: true
});


const rootElement = (
    <BrowserRouter>
        <App/>
    </BrowserRouter>);

ReactDOM.render(rootElement, document.getElementById('root'));
