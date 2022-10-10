import React from 'react';
import './../Product.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
// Css template
import './../products/asset/css/intro331js.min.css';
import './../products/asset/css/slick181.min.css';
import './../products/asset/css/slick181.min.css';
import './../products/asset/css/slick181-theme.css';
import './../products/asset/css/index-772c07.css';
import './../products/asset/css/application-2ecd1175.css';
import './../products/asset/css/application-2ecd1175.css';

import 'https://www.googleoptimize.com/optimize.js?id=GTM-MRQV72K';

import Header from './components/Header/Header';
import Content from './components/Content/Content';
import { ProductProvider } from './components/context/store';


function Product() {
    return (
        <ProductProvider>
            <Header />
            <Content />
        </ProductProvider>
    );
}

export default Product;