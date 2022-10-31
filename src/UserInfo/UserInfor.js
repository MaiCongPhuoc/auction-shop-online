import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { Provider } from 'react-redux';
import store from '../products/redux/store';
import Header from '../products/components/Header/Header';
import UserInfo from './UserInfo.js';
import HeaderSearch from './../products/components/Header/HeardSearch/HeaderSearch';
import HeaderLogo from './../products/components/Header/HeaderLogo/HeaderLogo';
import HeaderEnd from './../products/components/Header/HeaderEnd/HeaderEnd';
import HeaderAction from './../products/components/Header/HeaderAction/HeaderAction';
import HeaderAfterLogin from './../products/components/Header/HeaderAfterLogin/HeaderAfterLogin';
const UserInfor = () => {
    return (
        <Provider store={store}>
            <div className="full-width header-nav clearfix no-show-webview" id="navbar">
                <div className="padd-horizontal_category_nav">
                    <div className="show-for-medium">
                        <div className="main-header-div grid-x">
                            <HeaderSearch />
                            <HeaderLogo />
                            <HeaderAfterLogin />
                        </div>
                        <HeaderEnd />
                    </div>
                </div>
            </div>
            <UserInfo />
        </Provider>
    );
};

export default UserInfor;
