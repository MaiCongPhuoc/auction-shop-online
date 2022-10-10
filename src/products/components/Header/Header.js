import React from "react";
import HeaderAction from "./HeaderAction/HeaderAction";
import HeaderEnd from "./HeaderEnd/HeaderEnd";
import HeaderLogo from "./HeaderLogo/HeaderLogo";
import HeaderSearch from './HeardSearch/HeaderSearch';
import './header.css';
import './../../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../../../../node_modules/bootstrap/dist/js/bootstrap.js'
import { useStore } from './../context/store/hooks';
import HeaderAfterLogin from './HeaderAfterLogin/HeaderAfterLogin';

const Header = () => {

    const [state, dispatch] = useStore();

    const login = state.login;
    
    return (
        <>
            <div className="full-width header-nav clearfix no-show-webview">
                <div className="padd-horizontal_category_nav">
                    <div className="show-for-medium">
                        <div className="main-header-div grid-x">
                            <HeaderSearch />
                            <HeaderLogo />
                            {login ? <HeaderAfterLogin /> : <HeaderAction />}
                            
                        </div>

                        <div className="main-nav-div">
                            <HeaderEnd />
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Header;