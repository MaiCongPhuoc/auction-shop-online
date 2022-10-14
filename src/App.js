<<<<<<< HEAD

=======
>>>>>>> 842f2d45cbaf81b4b77d15e465d62d7f26b3385b
// import logo from './logo.svg';
import Dashboard from './dashboard/pages/Dashboard';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/bootstrap-5.2.0-dist/css/bootstrap.min.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import '../node_modules/jquery/dist/jquery.min.js';
import '../node_modules/jquery.easing/jquery.easing.min.js';
import './assets/css/sb-admin-2.min.css';
// import '../node_modules/startbootstrap-sb-admin-2/js/sb-admin-2.min.js';
import '../node_modules/chart.js/dist/Chart.min.js';

import Product from './products/Product';
import ListProduct from './dashboard/pages/ListProduct';
import ListAccount from './dashboard/pages/ListAccount';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Dashboard />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/product' element={<Product />} />
                    <Route path='/list-product' element={<ListProduct />} />
                    <Route path='/list-account' element={<ListAccount />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;