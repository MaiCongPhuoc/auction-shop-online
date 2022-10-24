import React from "react";

const HeaderEnd = () => {

    return (
        <div className="main-nav-div">
            <ul className="navigation">
                <li className="left"><a className="home" href="/product">Trang chủ</a></li>
                <li className="left">
                    <a className="nav-explore drop-category">Cửa hàng<span className="watch-circle my-cb-circle my-cb-count hidden">0</span></a>
                </li>
                <li className="left"><a className="btn-bin" href="/theme/buy-now/lots">Đấu giá</a></li>
                <li className="left"><a className="contact" href="/contact_us">Liên hệ</a></li>
                <li className="left"><a className="contact" href="/partners">Hợp tác cùng chúng tôi</a></li>
            </ul>
            <div className="charity-wrappper">
                <div className="depth-bg-wrapper">
                    <div className="close-charity-dropdown"><i className="icon-remove" /></div>
                    <input id="charities" placeholder="Search by all" type="text" />
                </div>
                <ul id="results" />
            </div>
        </div>
    );
}

export default HeaderEnd;