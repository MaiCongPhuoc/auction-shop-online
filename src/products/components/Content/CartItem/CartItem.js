import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { getAllCartItems } from "../../../redux/selector";

const CartItem = () => {
    const cartItems = useSelector(getAllCartItems);

    return (
        <div>
            <div id="show-list-cart-item">
                <div className="container">
                    <div className="row col-12 my-5">
                        <span className="text-center col-4" id="image-item"> Sản phẩm</span>
                        <span className="text-center col-2" id="title-item">Đơn giá</span>
                        <span className="text-center col-2" id="price-item">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item">Số tiền</span>
                        <span className="text-center col-2" id="total-item">Thao tác</span>
                    </div>
                    {cartItems.map(cartItem => (
                        <div className="row col-12" key={cartItem.id}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                                className="col-4">
                                <div>
                                    <img style={{
                                        padding: '5px',
                                        width: '100px',
                                        height: '120px'
                                    }} src={cartItem.product.image} alt="" />
                                </div>
                                <div>
                                    <div>{cartItem.product.title}</div>
                                    <div>{cartItem.product.description}</div>
                                </div>
                            </span>
                            <span className="text-end col-2">{cartItem.price}</span>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                                className="text-center col-2">
                                <span style={{
                                    fontSize: '36px',
                                    border: '0.5px solid #cacaca',
                                    height: '38px',
                                    lineHeight: '30px',
                                    cursor: 'pointer'
                                }}>-</span>
                                <input style={{ width: '50px', margin: 'auto', textAlign: 'center' }} type="text" defaultValue={cartItem.quantity} />
                                <span style={{
                                    fontSize: '28px',
                                    border: '0.5px solid #cacaca',
                                    height: '38px',
                                    lineHeight: '30px',
                                    cursor: 'pointer'
                                }}>+</span>
                            </span>
                            <span className="text-end col-2">{cartItem.amountTransaction}</span>
                            <span className="col-2">Xóa</span>
                        </div>
                    ))}
                    <h5>Sum: $ total</h5>
                </div>
            </div>
            <template id="product-box" />
            <template id="buy-box" />
        </div>
    );
}

export default CartItem;