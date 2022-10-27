// import logo from './logo.svg';
import Dashboard from './dashboard/pages/Dashboard';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './assets/bootstrap-5.2.0-dist/css/bootstrap.min.css';
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';

import './assets/css/sb-admin-2.min.css';
// import '../node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js';

import Product from './products/Product';
import ListProduct from './dashboard/pages/ListProduct';
import ListAccount from './dashboard/pages/ListAccount';
import Auction from './Auction';
import ListBidAuction from './Auction/ListBidAuction';
import ShowCartItem from './products/components/Content/CartItem/index';
import TheShopDetail from './products/components/Content/ProductDetail/TheShop/TheShopDetail';
import TheShop from './products/components/Content/ProductDetail/TheShop/index';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {/*1. Dashboard */}
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/list-account' element={<ListAccount />} />
                    <Route path='/list-product' element={<ListProduct />} />
                    {/*2. Client */}
                    <Route path='/product' element={<Product />} />
                    {/* - Auction */}
                    <Route path='/auction/:auctionId' element={<Auction />} />
                    <Route path='/bid/:auctionId' element={<ListBidAuction />} />
                    <Route path='/product/cart/:auctionId' element={<ShowCartItem />} />
                    {/* - The shop */}
                    <Route path='/product/the-shop/:slug' element={<TheShop />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
