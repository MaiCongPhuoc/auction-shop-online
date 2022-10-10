import React from "react";
import logoShop from './../../../asset/images/logoaso.png';

const HeaderLogo = () => {
    return (
        <div className="main-logo-div small-4">
            <a className="logo-home-link-new" href="#">
                <h1>AUCTION SHOP</h1>
                {/* <img src={logoShop} alt="Cb main no tagline" data-pagespeed-url-hash={3754917727} /> */}
            </a>
        </div>
    )
}

export default HeaderLogo;