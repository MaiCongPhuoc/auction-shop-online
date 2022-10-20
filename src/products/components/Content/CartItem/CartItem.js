import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getAccount, getAllCartItems } from "../../../redux/selector";
import CartItemService from './../../../service/CartItem/CartItemService';
import { setCartItems } from './../../../redux/actions';

const CartItem = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);


    const [cartItems, setCartItems] = useState([]);

    const [quantity, setQuantity] = useState(0);


    const [totalAmount, setTotalAmount] = useState(0);

    let amount = 0;

    useEffect(() => {
        try {
            async function getCartItems() {
                const allCartItems = await CartItemService.getCartItems(account.id);
                setCartItems(allCartItems.data);
                for (let i = 0; i < cartItems.length; i++) {
                    amount += cartItems[i].amountTransaction;
                }
                setTotalAmount(amount);
            }
            getCartItems();

        } catch (error) {
            console.log(error);
        }
    }, [quantity]);

    const handleReduceQuantity = (cartItem) => {
        try {
            async function reducerQuantity() {
                const newCartItem = await CartItemService.getReduceCartItem(cartItem.id);
                setQuantity(newCartItem.data.quantity);
            }
            reducerQuantity();
        } catch (error) {
            console.log(error);
        }
    };
    const handleIncreasingQuantity = (cartItem) => {
        try {
            async function increasingQuantity() {
                const newCartItem = await CartItemService.getIncreasingCartItem(cartItem.id);
                setQuantity(newCartItem.data.quantity);
            }
            increasingQuantity();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveCartItem = (cartItem) => {
        try {
            
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div id="show-list-cart-item">
                <div className="container">
                    <div className="row col-12 my-5">
                        <span className="text-center col-4" id="image-item"> Sản phẩm</span>
                        <span className="text-center col-2" id="title-item">Đơn giá (VNĐ)</span>
                        <span className="text-center col-2" id="price-item">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item">Thành tiền (VNĐ)</span>
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
                                <div className="text-start mx-2">
                                    <div>{cartItem.product.title}</div>
                                    <div style={{ fontSize: 'smaller', color: 'blue' }}>{cartItem.product.description}</div>
                                    <div style={{ fontSize: 'small', color: 'red' }}>Còn lại <b>{cartItem.product.available}</b></div>
                                </div>
                            </span>
                            <span className="text-end col-2">{FormatMoney(cartItem.price)}</span>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                                className="text-center col-2">
                                <div className="change-quantity"
                                    onClick={() => handleReduceQuantity(cartItem)}
                                    style={{
                                        fontSize: '36px',
                                        height: '38px',
                                        lineHeight: '30px',
                                        cursor: 'pointer',
                                        marginLeft: 'auto'
                                    }}>-</div>
                                <input style={{ width: '50px', margin: '0', border: 'none', textAlign: 'center' }}
                                    type="text"
                                    value={cartItem.quantity}
                                    // onChange={handleOnChangeQuantity}
                                    readOnly
                                />
                                <div className="change-quantity"
                                    onClick={() => handleIncreasingQuantity(cartItem)}
                                    style={{
                                        fontSize: '28px',
                                        height: '38px',
                                        lineHeight: '30px',
                                        cursor: 'pointer',
                                        marginRight: 'auto'
                                    }}>+</div>
                            </span>
                            <span className="text-end col-2">{FormatMoney(cartItem.amountTransaction)}</span>

                            <span className="col-2 remove-cart-item" onClick={() => handleRemoveCartItem(cartItem)}>
                                <i className="fa-solid fa-trash-can-arrow-up"></i>
                            </span>
                        </div>
                    ))}
                    <h6>
                        <div style={{ marginLeft: '50vw' }}>Tổng tiền: {FormatMoney(totalAmount)} VNĐ</div>
                    </h6>
                </div>
            </div>
            <template id="product-box" />
            <template id="buy-box" />
        </div>
    );
}

export default CartItem;