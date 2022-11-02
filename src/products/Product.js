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

import 'https://www.googleoptimize.com/optimize.js?id=GTM-MRQV72K';

import Header from './components/Header/Header';
import Content from './components/Content/Content';
import store from './redux/store';
import { Provider } from 'react-redux';
import './Product.css';
import Footer from './components/Footer/Footer';

function Product() {
    return (
        <>
            <Header className="product-client" />
            <Content className="product-client" />
            <br />
            <br />
            <br />
            <Footer />
        </>
    );
}

export default Product;
