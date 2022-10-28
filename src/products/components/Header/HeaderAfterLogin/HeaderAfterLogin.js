import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setShowCart, setShowAddProduct } from '../../../redux/actions';
import { getAccount, getAllCartItems, getShowCart, getShowAddProduct } from '../../../redux/selector';

import { Link } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import ModalAdd from '../../../../dashboard/modal/product/ModalAdd';
import { Button } from 'bootstrap';

const HeaderAfterLogin = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);

    const cartItems = useSelector(getAllCartItems);

    const handleShowModalAddProduct = () => {
        dispatch(setShowAddProduct(true));
    };
    const renderAccount = () => {
        return (
            <div className="dropdown-menu-right shadow animated--grow-in accountAdmin" aria-labelledby="userDropdown">
                {/* <a className="tippy-account p-2" href="#">
                    <FontAwesomeIcon icon={faPlus} className="pr-2" />
                    Add product
                </a> */}
                <a title="Thêm mới" type="button" className="btn btn-success" onClick={handleShowModalAddProduct}>
                    <i className="fa-solid fa-plus me-2" title="Thêm mới"></i>Thêm sản phẩm
                </a>
                <br />
                <br />
                <Link className="nav-link" to="/dashboard">
                    <i
                        title="Trang quản lý"
                        class="fa-solid fa-people-roof me-2"
                        style={{ backgroundColor: 'orange' }}
                    ></i>
                    <a title="Trang quản lý" type="button" style={{ backgroundColor: 'orange' }}>
                        Trang quản lý
                    </a>
                </Link>
            </div>
        );
    };
    const showAddProduct = useSelector(getShowAddProduct);
    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
                <Link to={`/product/cart/${account.id}`} style={{ fontSize: '14px' }}>
                    <i
                        style={{ position: 'relative' }}
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
                                left: '30px',
                                bottom: '15px',
                                padding: '3px',
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
                <Tippy
                    // delay={[0, 700]}
                    // offset={[15, 8]}
                    placement="bottom-end"
                    interactive
                    content={renderAccount()}
                    hideOnClick={true}
                    trigger="click"
                >
                    <span>
                        <a className="logged_in_name mx-3" href="#">
                            {account.username}
                        </a>
                    </span>
                </Tippy>
                <a id="customer-logout-link" className="new-login-button" rel="nofollow" href="/login">
                    ĐĂNG XUẤT
                </a>
            </div>
            <ModalAdd />
        </div>
    );
};

export default HeaderAfterLogin;
