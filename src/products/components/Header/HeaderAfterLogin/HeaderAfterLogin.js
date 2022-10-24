<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setShowCart, setShowAddProduct } from '../../../redux/actions';
import { getAccount, getAllCartItems, getShowCart, getShowAddProduct } from '../../../redux/selector';
=======

import React from "react";
import { useSelector } from 'react-redux/es/exports';
import { getAccount, getAllCartItems } from "../../../redux/selector";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import { Link } from 'react-router-dom';
>>>>>>> development

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import ModalAdd from '../../../../dashboard/modal/product/ModalAdd';
import { Button } from 'bootstrap';

const HeaderAfterLogin = () => {
    const account = useSelector(getAccount);

    const cartItems = useSelector(getAllCartItems);

<<<<<<< HEAD
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
    const handleShowModalAddProduct = () => {
        dispatch(setShowAddProduct(true))
    }
=======
>>>>>>> development
    const renderAccount = () => {
        return (
            <div className="dropdown-menu-right shadow animated--grow-in accountAdmin" aria-labelledby="userDropdown">
                {/* <a className="tippy-account p-2" href="#">
                    <FontAwesomeIcon icon={faPlus} className="pr-2" />
                    Add product
                </a> */}
                <a type="button" className="btn btn-outline-primary" onClick={handleShowModalAddProduct}>
                    Thêm sản phẩm
                </a>
            </div>
        );
    };
    const showAddProduct = useSelector(getShowAddProduct);
    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
<<<<<<< HEAD
                <div onClick={handleShowCart}>
                    <i
                        style={{ position: 'relative' }}
=======
                <Link to={`/product/cart/${account.id}`} style={{fontSize: '14px'}}>
                    <i style={{ position: 'relative' }}
>>>>>>> development
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
<<<<<<< HEAD
                                left: '40px',
                                bottom: '26px',
                                padding: '3px',
=======
                                left: '30px',
                                bottom: '15px',
                                padding: '3px'
>>>>>>> development
                            }}
                        >
                            {cartItems.length}
                        </span>
                    </i>
                </Link>
                <div className="widget-notif-wrapper">
                    <div>
                        <div className="ic-notif-num">
                            <i
                                style={{ position: 'relative' }}
                                className="fa-regular fa-bell fa-2x ic-notif "
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
                                        left: '15px',
                                        bottom: '15px',
                                        padding: '3px',
                                    }}
                                >
                                    1
                                </span>
                            </i>
                        </div>
                    </div>
                </div>
                {/* <a className="logged_in_name mx-3" href="#">{account.username}</a> */}
                <span>
                    <Tippy
                        // delay={[0, 700]}
                        // offset={[15, 8]}
                        placement="bottom-end"
                        interactive
                        content={renderAccount()}
                        hideOnClick={true}
                        trigger="click"
                    >
                        <a className="logged_in_name mx-3" href="#">
                            {account.username}
                        </a>
                    </Tippy>
                </span>
                <a id="customer-logout-link" className="new-login-button" rel="nofollow" href="/logout">
                    LOG OUT
                </a>
            </div>
            <ModalAdd />
        </div>
    );
};

export default HeaderAfterLogin;
