// import logo from './logo.svg';
import Dashboard from './dashboard/pages/Dashboard';
import React, { useEffect, useState } from 'react';
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
import ListCategories from './dashboard/pages/ListCategories/index';
import ListBidAuction from './Auction/ListBidAuction';
import ShowCartItem from './products/components/Content/CartItem/index';
import Register from './singup/Register';
import Login from './login/Login';
import Deny from './DenyPage/Deny';

function App() {
    const [isLogin, setIsLogin] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        let loginUser = localStorage.getItem('loginUser');
        if (loginUser) {
            setIsLogin(true);
            let userLoggedin = JSON.parse(loginUser);
            if (userLoggedin.isAdmin === true) {
                setIsAdmin(true);
            }
        }
    }, []);
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/list-account" element={<ListAccount />} />
                    <Route path="/list-product" element={<ListProduct />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/:auctionId" element={<Auction />} />
                    <Route path="/product/cart/:auctionId" element={<ShowCartItem />} />
                    <Route path="/dashboard/category" element={<ListCategories />} />
                    <Route path="/registration" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/bid/:auctionId" element={<ListBidAuction />} />
                    <Route path="/product/cart/:auctionId" element={<ShowCartItem />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
