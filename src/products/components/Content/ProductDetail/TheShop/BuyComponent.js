import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getAccount, getReloadCartItem } from '../../../../redux/selector';
import { FormatMoney, isNumber } from './../../../../Hooks/Hooks';
import CartItemService from './../../../../service/CartItem/CartItemService';
import ValidationQuantity from '../../../../utils/ValidationQuantity';
import { setReloadCartItem } from '../../../../redux/actions';

const BuyComponent = ({ product }) => {
    const dispatch = useDispatch();

    const reloadCartItem = useSelector(getReloadCartItem);
    const [checkQuantity, setCheckQuantity] = useState(true);
    const [errorMess, setErrorMess] = useState('');

    const account = useSelector(getAccount);

    const currentPrice = product.price;

    const [newTotalPrice, setNewTotalPrice] = useState(product.price);

    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        if (!isNumber(quantity)) {
            setCheckQuantity(false);
            setErrorMess('Số lượng phải là một số nguyên');
            return;
        }

        if (quantity > product.available) {
            setCheckQuantity(false);
            setErrorMess(`Vượt quá số lượng còn lại của sản phẩm là ${product.available}`);
            return;
        }

        setCheckQuantity(true);
        setNewTotalPrice(currentPrice * quantity);
    }, [quantity]);

    const cartItem = {
        product: {
            id: product.id
        },
        title: product.title,
        quantity: quantity
    };

    const reduceQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increasingQuantity = () => {
        if (quantity < product.available) {
            setQuantity(quantity + 1);
        }
    };

    const handleAddCartItem = () => {
        try {
            if (!checkQuantity) {
                setErrorMess('Hãy chọn số lượng hợp lệ');
                return;
            }
            async function postData() {
                let result = await CartItemService.addCartItem(account.id, cartItem);
                if (result.data) {
                    dispatch(setReloadCartItem(!reloadCartItem))
                    toast.success(`Đã thêm ${product.title} vào giỏ hàng của bạn`);
                }
            }
            postData();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="buy-tool" style={{width: '22%', margin: '50px auto'}}>
            <div className="bb-rows-wrapper">
                <div className="bb-row bb-current-buy">
                    <div className="bb-row title-buy text-center">
                        <i className="fa fa-info-circle me-2" aria-hidden="true" style={{ color: '#0e78cf' }} />
                        <span>Xem thêm nhều sản phẩm khác trong <b>Cửa hàng</b></span>
                    </div>
                    <div className="bb-item my-3" style={{ paddingLeft: '15px' }}>
                        <div className="current-bidder">
                            <div className="bb-title is-label text-start">
                                <span className="current-bid bid-box-label">Giá của sản phẩm:</span>
                            </div>
                            <div className="bb-content my-2 text-end">
                                <div className="bin-price fw-bold me-5">
                                    <span>{FormatMoney(product.price)} ₫</span>
                                </div>
                            </div>
                        </div>
                        <div className="current-bidder">
                            <div className="bb-title is-label text-start">
                                <span className="current-bid bid-box-label">Giá tạm tính:</span>
                            </div>
                            <div className="bb-content my-2 text-end">
                                <div className="bin-price fw-bold me-5">
                                    <span>{FormatMoney(newTotalPrice)} ₫</span>
                                </div>
                            </div>
                        </div>
                        <div className="bb-row bb-bin-bid">
                            <form>
                                <div className="bb-item">
                                    <div className="bb-item-qty" style={{ width: '30%', display: 'inline-block' }}>
                                        <label htmlFor='quantity' className="bid-box-label" style={{ color: '#333', fontWeight: 600, padding: '3px 0px' }}>Số lượng</label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div id='reduce-quantity' onClick={reduceQuantity}>
                                                <i
                                                    className="fa fa-window-minimize"
                                                >
                                                </i>
                                            </div>
                                            <input
                                                onChange={(e) => { setQuantity(e.target.value) }}
                                                type="text"
                                                id='quantity'
                                                className="quantity_control ms-2 mt-2"
                                                name="qty"
                                                value={quantity}
                                                style={{ lineHeight: '30px', width: '50px' }}>
                                            </input>
                                            <div id='increasing-quantity' onClick={increasingQuantity}>
                                                <i
                                                    className="fa fa-plus"
                                                >
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ms-1" style={{ marginTop: '46px', float: 'right' }}>
                                        <span className="current-bid bid-box-label" style={{ color: '#788088', fontWeight: 600, fontSize: '11pt', padding: '3px 0px' }}>&nbsp;</span>
                                        <a className="btn btn-primary me-4" onClick={handleAddCartItem}>Mua ngay</a>
                                    </div>
                                    {checkQuantity ? null: <ValidationQuantity message={errorMess} />}
                                </div>
                            </form>
                            <div className="bin-qty text-center mt-3">
                                số lượng còn lại <strong>{product.available}</strong></div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className="watchlist-action">
                        <div className="watcher-btn text-center">
                            <a className="watch-button" href="#" style={{border: 'none !important'}}>
                                <div className="relative-wrapper watch-wrapper btn">
                                    <div className="watching-plus" style={{ fontStyle: 'normal', display: 'block !important' }}>
                                        <i className="fa-regular fa-heart"></i>
                                        <span className="watch-type"> Thêm vào danh sách yêu thích</span>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="viewers text-center mt-2" style={{ fontSize: '14px' }}><b>30</b> người đang theo dõi sản phẩm này</div>
                    <div className="cs-action text-center" style={{ fontSize: '14px' }}><b>{product.sold}</b> sản phẩm đã bán</div>
                </div>
            </div>
            <ToastContainer autoClose={1000}/>
        </div>
    );
}

export default BuyComponent;