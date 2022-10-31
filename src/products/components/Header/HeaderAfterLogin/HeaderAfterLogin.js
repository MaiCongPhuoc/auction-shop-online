import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { setShowCart, setShowAddProduct } from '../../../redux/actions';
import { getAccount, getAllCartItems, getShowAddProduct, getReloadCartItem } from '../../../redux/selector';

import { Link, useNavigate } from 'react-router-dom';

import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Tippy from '@tippyjs/react';
import ModalAdd from '../../../../dashboard/modal/product/ModalAdd';
import CartItemService from '../../../service/CartItem/CartItemService';
import { Swal } from 'sweetalert2';
import { ToastContainer } from 'react-toastify';
import AdminInfo from './../../../../dashboard/Layout/Header/adminInfo/AdminInfo';

const HeaderAfterLogin = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginUser');
    };

    const [cartItems, setListCartItems] = useState([]);

    const reloadCartItem = useSelector(getReloadCartItem);

    useEffect(() => {
        try {
            async function getCartItems() {
                const allCartItems = await CartItemService.getCartItems(account.id);
                setListCartItems(allCartItems.data);
            }
            getCartItems();
        } catch (error) {
            console.log(error);
        }
    }, [reloadCartItem]);

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
                    <i className="fa-solid fa-plus me-2" title="Thêm mới"></i>Tạo sản phẩm
                </a>
                <br />
                <br />
                <Link className="nav-link" to="/dashboard">
                    <i
                        title="Trang quản lý"
                        class="fa-solid fa-people-roof me-2"
                        style={{ backgroundColor: 'orange' }}
                    ></i>
                    <button
                        title="Trang quản lý"
                        type="button"
                        style={{ backgroundColor: 'orange' }}
                        onClick={function () {
                            alert('okk');
                            // Swal.fire({
                            //     icon: 'warning',
                            //     title: '<br/> Bạn có chắc đăng xuất không?',
                            //     showDenyButton: true,
                            //     showCancelButton: true,
                            //     showConfirmButton: false,
                            //     denyButtonText: `Đăng xuất`,
                            // }).then((result) => {
                            //     if (result.isDenied) {
                            //         // toast.success(`Đăng xuất thành công!`);
                            //         // setTimeout(() => {
                            //         //     navigate('/login');
                            //         //     logout();
                            //         // }, 2000);
                            //         console.log('result.isDenied: ', result.isDenied);
                            //     }
                            // });
                        }}
                    >
                        Trang quản lý
                    </button>
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
                            <Tippy
                                placement="bottom-end"
                                interactive
                                content={renderAccount()}
                                hideOnClick={true}
                                trigger="click"
                            >
                                <button className="logged_in_name mx-3" href="#">
                                    THAO TÁC THÊM
                                </button>
                            </Tippy>
                        </div>
                    </div>
                </div>
            </div>
            <AdminInfo />
            <ModalAdd />
            <ToastContainer autoClose={1500} />
        </div>
    );
};

export default HeaderAfterLogin;
