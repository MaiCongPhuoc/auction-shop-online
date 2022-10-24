import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getAccount } from "../../../redux/selector";
import CartItemService from './../../../service/CartItem/CartItemService';
import { setCartItems, setShowCartModalCheckout } from './../../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import LoadData from "../../Loading/LoadData";
import ValidationQuantity from "../../../utils/ValidationQuantity";
import Checkout from './../../../Modal/Checkout';

const CartItem = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);

    const [loadDataCart, setLoadDataCart] = useState(false);

    const [loadQuantity, setLoadQuantity] = useState(false);

    const [disable, setDisable] = useState(false);

    const [checkQuantity, setCheckQuantity] = useState(true);

    const [idCartItem, setIdCartItem] = useState(0);

    const [listCartItems, setListCartItems] = useState([]);



    let totalAmount = 0;

    const [choiceItems, setChoiceItems] = useState([]);

    useEffect(() => {
        try {
            setLoadDataCart(true);
            async function getCartItems() {
                const allCartItems = await CartItemService.getCartItems(account.id);
                setListCartItems(allCartItems.data);
                setLoadDataCart(false);
            }
            getCartItems();

        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleReduceQuantity = (cartItem) => {
        try {
            setLoadQuantity(true);
            async function reducerQuantity() {
                setIdCartItem(cartItem.id);
                await CartItemService.getReduceCartItem(cartItem.id);
                const allCartItems = await CartItemService.getCartItems(account.id);
                setListCartItems(allCartItems.data);
                setLoadQuantity(false);
                setCheckQuantity(true);
            }
            reducerQuantity();
        } catch (error) {
            console.log(error);
        }
    };
    const handleIncreasingQuantity = (cartItem) => {
        try {
            setLoadQuantity(true);
            async function increasingQuantity() {
                setIdCartItem(cartItem.id);
                await CartItemService.getIncreasingCartItem(cartItem.id);
                const allCartItems = await CartItemService.getCartItems(account.id);
                setListCartItems(allCartItems.data);
                setLoadQuantity(false);
            }
            increasingQuantity();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveCartItems = (items) => {
        try {
            setLoadDataCart(true)
            async function removeCartItems() {
                const newCartItems = await CartItemService.getRemoveCartItems(account.id, items);
                setListCartItems(newCartItems.data);
                toast.error(`Đã xóa ${choiceItems.length} sản phẩm ra khỏi giỏ hàng`)
                setChoiceItems([]);
                setLoadDataCart(false);
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

    const handleChoiceByDbClick = (cartItem) => {
        if (document.querySelector(`#choice_${cartItem.id}`).hasAttribute('checked')) {
            document.querySelector(`#choice_${cartItem.id}`).removeAttribute('checked');
            setDisable(false);
        } else {
            document.querySelector(`#choice_${cartItem.id}`).setAttribute('checked', '');
            setDisable(true);
        }
        setChoiceItems(prev => {
            if (choiceItems.includes(cartItem)) {
                return choiceItems.filter(item => item !== cartItem);
            } else {
                return [...prev, cartItem];
            };
        });
    };

    const handleBuyCartItem = () => {
        if (choiceItems.length > 0) {
            dispatch(setShowCartModalCheckout(true));
        } else {
            toast.warning("Hãy chọn sản phẩm cần mua");
        }
    };

    choiceItems.forEach(element => {
        totalAmount = totalAmount + element.amountTransaction;
    });

    dispatch(setCartItems(listCartItems));
    return (
        <div>
            <div id="show-list-cart-item">

                <div className="container text-center">
                    <div className="row col-12 my-1" style={{ height: '50px' }}>
                        <span className="fw-bold col-1" style={{ color: '#367289' }}>Giỏ hàng</span>
                        <span className="text-center col-5" id="image-item"> Sản phẩm</span>
                        <span className="text-center col-2" id="title-item">Đơn giá</span>
                        <span className="text-center col-2" id="price-item">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item">Thành tiền</span>
                    </div>
                    {loadDataCart ? <LoadData /> :
                        listCartItems.map(cartItem => (
                            <div title="Nhấn hai lần để chọn" className="row col-12 cart-item" key={cartItem.id} onDoubleClick={() => handleChoiceByDbClick(cartItem)}>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                    className="col-6">
                                    <input type="checkbox" id={`choice_${cartItem.id}`} onChange={() => handleChoice(cartItem)} />
                                    <div className="col-3">
                                        <img style={{
                                            padding: '5px',
                                            width: '100px',
                                            height: '120px'
                                        }} src={cartItem.product.image} alt="" />
                                    </div>
                                    <div className="text-start mx-2 col-9">
                                        <div>{cartItem.product.title}</div>
                                        <div style={{ fontSize: 'smaller', color: 'blue' }}>{cartItem.product.description}</div>
                                        <div style={{ fontSize: 'small', color: 'blue' }}>Sản phẩm: {cartItem.product.action ? 'Đấu giá' : 'Cửa hàng'}</div>
                                        <div style={{ fontSize: 'small', color: 'red' }}>Còn lại <b>{cartItem.product.available}</b></div>
                                    </div>
                                </span>
                                <span className="text-end col-2 fw-bold">{FormatMoney(cartItem.price)} ₫</span>
                                <span style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                    className="text-center col-2">
                                    <div className="change-quantity"
                                        title="Giảm một sản phẩm"
                                        onClick={() => handleReduceQuantity(cartItem)}
                                        style={{
                                            fontSize: '36px',
                                            height: '38px',
                                            lineHeight: '30px',
                                            cursor: 'pointer',
                                            marginLeft: 'auto',
                                        }}>
                                        -
                                    </div>
                                    <input
                                        style={{
                                            width: '50px',
                                            margin: '0',
                                            border: 'none',
                                            textAlign: 'center',
                                            borderRadius: '20px'
                                        }}
                                        type="text"
                                        value={cartItem.quantity}
                                        // disabled={idCartItem === cartItem.id ? loadQuantity : null}
                                        disabled
                                    />
                                    <div className="change-quantity"
                                        title="Tăng một sản phẩm"
                                        onClick={() => handleIncreasingQuantity(cartItem)}
                                        style={{
                                            fontSize: '28px',
                                            height: '38px',
                                            lineHeight: '30px',
                                            cursor: 'pointer',
                                            marginRight: 'auto',
                                        }}>+
                                    </div>
                                    {checkQuantity ? null : <ValidationQuantity message={"Số lượng không thể nhỏ hơn 1"} />}
                                </span>
                                <span className="text-end col-2 fw-bold">{FormatMoney(cartItem.amountTransaction)} ₫</span>
                            </div>
                        ))}
                </div>
                <footer
                    style={{
                        bottom: '0',
                        left: '0',
                        backgroundColor: 'white',
                        boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)',
                        display: 'flex',
                        width: '100vw'
                    }}
                >
                    <div  style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
                        <button
                            className="btn btn-outline-danger col-4"
                            style={{ marginLeft: '90px', height: '50px' }}
                            onClick={() => handleRemoveCartItems(choiceItems)}
                        >
                            <i className="fa-solid fa-trash-can-arrow-up me-2"></i>
                            Xóa ({choiceItems.length} sản phẩm)
                        </button>
                        <div
                            className="col-4"
                            style={{
                                marginLeft: '50vw',
                                lineHeight: '100px'
                            }}
                        >
                            Tổng tiền ({choiceItems.length} sản phẩm): <b style={{ color: 'red' }}>{FormatMoney(totalAmount)} ₫</b>
                        </div>
                        <button
                            className="btn btn-primary ms-5 col-4"
                            onClick={() => handleBuyCartItem(choiceItems)}
                        >
                            Mua hàng
                        </button>
                    </div>
                </footer>
            </div>
            <template id="product-box" />
            <template id="buy-box" />
            <ToastContainer autoClose={1000} />
            <Checkout items={choiceItems} />
        </div >
    );
}

export default CartItem;