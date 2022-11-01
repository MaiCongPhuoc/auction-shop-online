import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getAccount, getReloadCartItem } from "../../../redux/selector";
import CartItemService from '../../../service/CartItem/CartItemService';
import LoadCart from '../../Loading/LoadCart';
import LoadQuantity from '../../Loading/LoadQuantity';
import OrdersDetailService from './../../../service/OrdersDetail/OrderDetail';
import { toast } from 'react-toastify';
import { setOrderDetails } from "../../../redux/actions";

const OrderDetail = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);

    const [loadOrderDetails, setLoadOrderDetails] = useState(false);
    const [emptyOrderDetails, setEmptyOrderDetails] = useState(false);
    const [listOrderDetails, setListOrderDetails] = useState([]);



    useEffect(() => {
        try {
            setLoadOrderDetails(true);
            async function getOrderDetails() {
                OrdersDetailService.getAllOrdersDetail(account.email).then((res) => {
                    if (res.data.length > 0) {
                        setListOrderDetails(res.data);
                        setLoadOrderDetails(false);
                        setEmptyOrderDetails(false);
                    } else {
                        setEmptyOrderDetails(true);
                    }
                }).catch((err) => {
                    toast.error(err.responseText)
                });
            }
            getOrderDetails();

        } catch (error) {
            console.log(error);
        }
    }, []);

    dispatch(setOrderDetails(listOrderDetails));
    return (
        <div>

            <div id="show-list-cart-item">
                <div className="container text-center">
                    <div className="fw-bold col-1" style={{ color: '#367289' }}>Đơn hàng</div>
                    <div className="row col-10 my-1" style={{ height: '50px' }}>
                        <span className="text-center col-4" id="image-order"> Sản phẩm</span>
                        <span className="text-center col-2" id="date-item-order">Thời gian</span>
                        <span className="text-center col-2" id="price-item-order">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item-order">Tổng tiền</span>
                        <span className="text-center col-2" id="status-item-order">trạng thái</span>
                    </div>
                    {loadOrderDetails ? <LoadCart /> :
                        listOrderDetails.map(orderDetail => (
                            <div 
                                className="row col-12 cart-item"
                                key={orderDetail.id}
                            >
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                    className="col-6">
                                    {choiceAll ? (
                                        <label className="container-check-cart">
                                            <input type="checkbox" checked />
                                            <span className="checkmark"></span>
                                        </label>
                                    ) : (
                                        <label className="container-check-cart">
                                            <input type="checkbox" id={`choice_${orderDetail.id}`} onClick={() => handleChoice(orderDetail)} />
                                            <span className="checkmark"></span>
                                        </label>
                                    )}
                                    <div className="col-3">
                                        <img style={{
                                            padding: '5px',
                                            width: '100px',
                                            height: '120px'
                                        }} src={orderDetail.product.image} alt="" />
                                    </div>
                                    <div className="text-start mx-2 col-9">
                                        <div>{orderDetail.product.title}</div>
                                        <div style={{ fontSize: 'smaller', color: 'blue' }}>{orderDetail.product.description}</div>
                                        <div style={{ fontSize: 'small', color: 'blue' }}>Sản phẩm: {orderDetail.product.action ? 'Đấu giá' : 'Cửa hàng'}</div>
                                        <div style={{ fontSize: 'small', color: 'red' }}>Còn lại <b>{orderDetail.product.available}</b></div>
                                    </div>
                                </span>
                                <span className="text-end col-2 fw-bold">{FormatMoney(orderDetail.price)} ₫</span>
                                {disableLoadQuantity ? (
                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly'
                                    }}
                                        className="text-center col-2">
                                    </span>
                                ) : (

                                    <span style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-evenly'
                                    }}
                                        className="text-center col-2">
                                        <div className="change-quantity show"
                                            id={`reduce_${orderDetail.id}`}
                                            title="Giảm một sản phẩm"
                                            style={{
                                                fontSize: '36px',
                                                height: '38px',
                                                lineHeight: '30px',
                                                cursor: 'pointer',
                                                marginLeft: 'auto',
                                            }}>
                                            {orderDetail.quantity}
                                        </div>
                                       
                                    </span>
                                )}
                                <span className="text-end col-2 fw-bold">{FormatMoney(orderDetail.amountTransaction)} ₫</span>
                            </div>
                        ))}
                </div>
                <footer className="col-12"
                    style={{
                        bottom: '0',
                        left: '0',
                        backgroundColor: 'white',
                        boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)',
                        display: 'flex',
                        width: '100vw'
                    }}
                >
                    <div className="col-12" style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                        <span onChange={handleChoiceAll} className="col-1" style={{ color: '#367289', display: 'flex', justifyContent: 'flex-end' }}>
                            <label className="container-check-cart col-3">
                                <input type="checkbox" id="choice_all" />
                                <span className="checkmark"></span>
                            </label>
                            <label style={{ cursor: 'pointer' }} htmlFor="choice_all">Tất cả</label>
                        </span>
                        <div className="col-3">
                            {removeCart ? (
                                <button class="btn btn-outline-danger" style={{ borderRadius: '5px' }} type="button" disabled>
                                    <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Đang xóa ({choiceItems.length} sản phẩm)
                                </button>
                            ) : (
                                <button
                                    className="btn btn-outline-danger"
                                    style={{ height: '50px' }}
                                    onClick={() => handleRemoveCartItems(choiceItems)}
                                >
                                    <i className="fa-solid fa-trash-can-arrow-up me-2"></i>
                                    Xóa ({choiceItems.length} sản phẩm)
                                </button>
                            )}
                        </div>
                        <div className="col-5 text-end">
                            <div
                                style={{
                                    // marginLeft: '50vw',
                                    lineHeight: '100px'
                                }}
                            >
                                Tổng tiền ({choiceItems.length} sản phẩm): <b style={{ color: 'red' }}>{FormatMoney(totalAmount)} ₫</b>
                            </div>
                        </div>
                        <div className="col-3 text-center">
                            <button
                                className="btn btn-primary ms-5 col-4"
                                onClick={() => handleBuyCartItem(choiceItems)}
                            >
                                Mua hàng
                            </button>
                        </div>
                    </div>
                </footer>
            </div>
        </div >
    );
}

export default OrderDetail;