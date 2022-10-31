import React, { useEffect, useState } from "react";
import { StyledEngineProvider } from "@mui/material/styles";
import { useSelector, useDispatch } from 'react-redux';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getAccount, getReloadCartItem } from "../../../redux/selector";
import CartItemService from './../../../service/CartItem/CartItemService';
import { setCartItems, setReloadCartItem, setShowCartModalCheckout } from './../../../redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import ValidationQuantity from "../../../utils/ValidationQuantity";
import Checkout from './../../../Modal/Checkout';
import EmptyCart from "../../Loading/EmptyCart";
import LoadCart from './../../Loading/LoadCart';
import LoadQuantity from './../../Loading/LoadQuantity';

const CartItem = () => {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);

    const [loadDataCart, setLoadDataCart] = useState(false);

    const [removeCart, setRemoveCart] = useState(false);

    const [emptyCartItems, setEmptyCartItems] = useState(false);

    const [disableLoadQuantity, setDisableLoadQuantity] = useState(false);

    const [checkQuantity, setCheckQuantity] = useState(true);

    const [idCartItem, setIdCartItem] = useState(0);

    const [listCartItems, setListCartItems] = useState([]);

    const reloadCartItem = useSelector(getReloadCartItem);

    let totalAmount = 0;

    const [choiceItems, setChoiceItems] = useState([]);

    useEffect(() => {
        try {
            setLoadDataCart(true);
            async function getCartItems() {
                const allCartItems = await CartItemService.getCartItems(account.email);
                if (allCartItems.data.length > 0) {
                    setListCartItems(allCartItems.data);
                    setLoadDataCart(false);
                    setChoiceItems([]);
                } else {
                    setListCartItems([]);
                    setEmptyCartItems(true);
                }
            }
            getCartItems();

        } catch (error) {
            console.log(error);
        }
    }, [reloadCartItem]);

    useEffect(() => {
        try {
            listCartItems.forEach(cartItem => {
                if (document.querySelector(`#choice_${cartItem.id}`).hasAttribute('checked')) {
                    document.querySelector(`#reduce_${cartItem.id}`).classList.remove('show');
                    document.querySelector(`#reduce_${cartItem.id}`).classList.add('hide');

                    document.querySelector(`#increasing_${cartItem.id}`).classList.remove('show');
                    document.querySelector(`#increasing_${cartItem.id}`).classList.add('hide');
                }
                else {
                    document.querySelector(`#reduce_${cartItem.id}`).classList.remove('hide');
                    document.querySelector(`#reduce_${cartItem.id}`).classList.add('show');

                    document.querySelector(`#increasing_${cartItem.id}`).classList.remove('hide');
                    document.querySelector(`#increasing_${cartItem.id}`).classList.add('show');
                }
            });

        } catch (error) {
            console.log(error);
        }
    }, [choiceItems]);

    const handleReduceQuantity = (cartItem) => {
        try {
            setDisableLoadQuantity(true);
            async function reducerQuantity() {
                setIdCartItem(cartItem.id);
                CartItemService.getReduceCartItem(cartItem.id).then((res) => {
                    CartItemService.getCartItems(account.email).then((resp) => {
                        setListCartItems(resp.data);
                        setCheckQuantity(true);
                        setDisableLoadQuantity(false);
                    });
                });
            }
            reducerQuantity();
        } catch (error) {
            console.log(error);
        }
    };
    const handleIncreasingQuantity = (cartItem) => {
        try {
            setDisableLoadQuantity(true);
            async function increasingQuantity() {
                setIdCartItem(cartItem.id);
                CartItemService.getIncreasingCartItem(cartItem.id).then((res) => {
                    CartItemService.getCartItems(account.email).then((resp) => {
                        setListCartItems(resp.data);
                        setDisableLoadQuantity(false);
                    });
                });
            }
            increasingQuantity();
        } catch (error) {
            console.log(error);
        }
    };

    const handleRemoveCartItems = (items) => {
        try {
            setLoadDataCart(true);
            setRemoveCart(true);
            async function removeCartItems() {
                const newCartItems = await CartItemService.getRemoveCartItems(account.email, items);
                // setListCartItems(newCartItems.data);
                toast.error(`Đã xóa ${choiceItems.length} sản phẩm ra khỏi giỏ hàng`)
                setChoiceItems([]);
                setLoadDataCart(false);
                setRemoveCart(false);
                dispatch(setReloadCartItem(!reloadCartItem));
            }
            removeCartItems();

        } catch (error) {
            console.log(error);
        }
    };

    const handleChoice = (cartItem) => {
        if (document.querySelector(`#choice_${cartItem.id}`).hasAttribute('checked')) {
            document.querySelector(`#choice_${cartItem.id}`).removeAttribute('checked');
        } else {
            document.querySelector(`#choice_${cartItem.id}`).setAttribute('checked', 'checked');
        }
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
        } else {
            document.querySelector(`#choice_${cartItem.id}`).setAttribute('checked', 'checked');
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
            {
                emptyCartItems ?
                    <EmptyCart />
                    : (
                        <div id="show-list-cart-item">
                            <div className="container text-center">
                                <div className="row col-12 my-1" style={{ height: '50px' }}>
                                    <span className="fw-bold col-1" style={{ color: '#367289' }}>Giỏ hàng</span>
                                    <span className="text-center col-5" id="image-item"> Sản phẩm</span>
                                    <span className="text-center col-2" id="title-item">Đơn giá</span>
                                    <span className="text-center col-2" id="price-item">Số lượng</span>
                                    <span className="text-center col-2" id="quantity-item">Thành tiền</span>
                                </div>
                                {loadDataCart ? <LoadCart /> :
                                    listCartItems.map(cartItem => (
                                        <div title="Nhấn hai lần để chọn"
                                            className="row col-12 cart-item"
                                            key={cartItem.id}
                                        // onDoubleClick={() => handleChoiceByDbClick(cartItem)}
                                        >
                                            <span style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}
                                                className="col-6">
                                                <label class="container-check-cart">
                                                    <input type="checkbox" id={`choice_${cartItem.id}`} onClick={() => handleChoice(cartItem)} />
                                                    <span class="checkmark"></span>
                                                </label>
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
                                            {disableLoadQuantity ? (
                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly'
                                                }}
                                                    className="text-center col-2">
                                                    {/* <input
                                                        className="mx-1"
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
                                                    /> */}
                                                    <LoadQuantity />
                                                </span>
                                            ) : (

                                                <span style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'space-evenly'
                                                }}
                                                    className="text-center col-2">
                                                    <div className="change-quantity show"
                                                        id={`reduce_${cartItem.id}`}
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
                                                        className="mx-1"
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
                                                    <div className="change-quantity show"
                                                        id={`increasing_${cartItem.id}`}
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
                                            )}
                                            <span className="text-end col-2 fw-bold">{FormatMoney(cartItem.amountTransaction)} ₫</span>
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
                                    <span className="col-1" style={{ color: '#367289', display: 'flex', justifyContent: 'flex-end' }}>
                                        <label class="container-check-cart col-3">
                                            <input type="checkbox" id="choice_all" />
                                            <span class="checkmark"></span>
                                        </label>
                                        <label style={{cursor: 'pointer'}} htmlFor="choice_all">Tất cả</label>
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
                    )
            }
            <template id="product-box" />
            <template id="buy-box" />
            <ToastContainer autoClose={1000} />
            <StyledEngineProvider injectFirst>
                <Checkout items={choiceItems} />
            </StyledEngineProvider>
        </div >
    );
}

export default CartItem;