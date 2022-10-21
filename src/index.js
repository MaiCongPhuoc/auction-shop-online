import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './assets/css/style.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './dashboard/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
            <App />
    </Provider>,
);

reportWebVitals();
