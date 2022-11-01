import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
// Css template
import './asset/css/intro331js.min.css';
import './asset/css/slick181.min.css';
import './asset/css/slick181.min.css';
import './asset/css/slick181-theme.css';
import './asset/css/index-772c07.css';
import './asset/css/application-2ecd1175.css';
import './asset/css/application-2ecd1175.css';
import { Provider } from 'react-redux';
import store from '../products/redux/store';
import Header from '../products/components/Header/Header';
import ContentLogin from './ContentLogin';
import Footer from './../products/components/Footer/Footer';

const Login = () => {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <ContentLogin className="product-client" />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </Provider>
    );
};

export default Login;
