import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getAccount, getAllCartItems } from "../../../redux/selector";
import CartItemService from './../../../service/CartItem/CartItemService';
import { setCartItems } from './../../../redux/actions';

const CartItem = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);


    const [listCartItems, setListCartItems] = useState([]);

    const [quantity, setQuantity] = useState(0);

    let totalAmount = 0;

    const [choiceItems, setChoiceItems] = useState([]);

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
            async function removeCartItem() {
                const newCartItems = await CartItemService.getRemoveCartItem(cartItem.id);
                setListCartItems(newCartItems.data);
            }
            removeCartItem();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveCartItems = (items) => {
        try {
            async function removeCartItems() {
                const newCartItems = await CartItemService.getRemoveCartItems(account.id, items);
                setListCartItems(newCartItems.data);
                setChoiceItems([]);
            }
            removeCartItems();
        } catch (error) {
            console.log(error);
        }
    };

    const handleChoice = (cartItem) => {
        setChoiceItems(prev => {
            if (choiceItems.includes(cartItem)) {
                return choiceItems.filter(item => item !== cartItem);
            } else {
                return [...prev, cartItem];
            };
        });

    };

    choiceItems.forEach(element => {
        totalAmount = totalAmount + element.amountTransaction;
    });

    dispatch(setCartItems(listCartItems));
    return (
        <div>
            <div id="show-list-cart-item">
                <div>Giỏ hàng</div>
                <div className="container">
                    <div className="row col-12 my-5">
                        <span className="text-center col-4" id="image-item"> Sản phẩm</span>
                        <span className="text-center col-2" id="title-item">Đơn giá (VNĐ)</span>
                        <span className="text-center col-2" id="price-item">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item">Thành tiền (VNĐ)</span>
                        <span className="text-center col-2" id="total-item">Thao tác</span>
                    </div>
                    {listCartItems.map(cartItem => (
                        <div className="row col-12" key={cartItem.id}>
                            <span style={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                                className="col-4">
                                <div className="me-2">
                                    <input type="checkbox" onChange={() => handleChoice(cartItem)} />
                                </div>
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
                                    <div style={{ fontSize: 'small', color: 'blue' }}>Sản phẩm: {cartItem.product.action ? 'Đấu giá' : 'Cửa hàng'}</div>
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
                                    disabled
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
                    <footer
                        style={{
                            position: 'fixed',
                            bottom: '0',
                            left: '0',
                            backgroundColor: 'white',
                            boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)',
                            display: 'flex',
                            width: '100vw'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                            <button
                                className="btn btn-outline-danger"
                                style={{marginLeft: '90px', height: '50px'}}
                                onClick={() => handleRemoveCartItems(choiceItems)}
                            >
                                Xóa ({choiceItems.length} sản phẩm)
                            </button>
                            <div style={{
                                marginLeft: '50vw',
                                lineHeight: '100px'
                            }}
                            >
                                Tổng tiền ({choiceItems.length} sản phẩm): <b style={{ color: 'red' }}>{FormatMoney(totalAmount)} VNĐ</b>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <template id="product-box" />
            <template id="buy-box" />
        </div >
    );
}

export default CartItem;