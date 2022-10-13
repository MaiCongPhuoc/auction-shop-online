import React from "react";

const HeaderAction = () => {
    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
                <a id="show-login-popup" className="new-login-button" href="/login">ĐĂNG NHẬP</a>

                <a className="new-signup-button" href="/registration">ĐĂNG KÝ</a>
            </div>
        </div>
    )
}

export default HeaderAction;