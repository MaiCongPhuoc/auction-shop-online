
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setShowCart } from "../../../redux/actions";
import { getAccount, getAllCartItems, getShowCart } from "../../../redux/selector";

const HeaderAfterLogin = () => {
    const dispatch = useDispatch();

    const [show_cart, set_show_cart] = useState(false);

    const account = useSelector(getAccount);

    const cartItems = useSelector(getAllCartItems);

    const show = useSelector(getShowCart);

    useEffect(() => {
        if (show_cart) {
            dispatch(setShowCart(true));
        } else {
            dispatch(setShowCart(false));
        }
    }, [show_cart]);

    const handleShowCart = () => {
        set_show_cart(!show_cart);
    };

    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
                <div onClick={handleShowCart}>
                    <i style={{ position: 'relative' }}
                        className="fa-brands fa-opencart fa-2x ic-cart me-3"
                        aria-hidden="true"
                        
                    >
                        <span
                            style={{
                                textAlign: 'center',
                                position: 'absolute',
                                border: '0.5px solid white',
                                width: 'auto',
                                height: '20px',
                                borderRadius: '10px',
                                backgroundColor: 'red',
                                color: 'white',
                                fontSize: '12px',
                                left: '40px',
                                bottom: '26px',
                                padding: '3px'
                            }}
                        >
                            {cartItems.length}
                        </span>
                    </i>
                </div>
                <div className="widget-notif-wrapper">
                    <div>

                        <div className="ic-notif-num">
                            <i style={{ position: 'relative' }} className="fa-regular fa-bell fa-2x ic-notif " aria-hidden="true" >
                                <span
                                    style={{
                                        textAlign: 'center',
                                        position: 'absolute',
                                        border: '0.5px solid white',
                                        width: 'auto',
                                        height: '20px',
                                        borderRadius: '10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        fontSize: '12px',
                                        left: '15px',
                                        bottom: '15px',
                                        padding: '3px'
                                    }}
                                >
                                    1
                                </span>
                            </i>
                        </div>

                    </div>
                </div>
                <a className="logged_in_name mx-3" href="#">{account.username}</a> |
                <a id="customer-logout-link" className="new-login-button" rel="nofollow" href="/logout">LOG OUT</a>
            </div>
        </div>
    )
}

export default HeaderAfterLogin;