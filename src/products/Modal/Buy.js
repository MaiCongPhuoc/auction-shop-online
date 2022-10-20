import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FormatMoney, isNumber } from '../Hooks/Hooks';
import { getAccount } from '../redux/selector';
import CartItemService from '../service/CartItem/CartItemService';
import ValidationQuantity from '../utils/ValidationQuantity';

const Buy = ({ product }) => {

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
        title: `${account.username}-${product.title}`,
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
                setErrorMess('Hãy chọn số lượng cần mua hợp lệ');
                return;
            }
            async function postData() {
                let result = await CartItemService.addCartItem(account.id, cartItem);
                if (result.data) {
                    toast.success(`Đã thêm ${product.title} vào giỏ hàng của bạn`);
                }
            }
            postData();
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="buy-tool">
            <div className="bb-rows-wrapper">
                <div className="bb-row bb-current-buy">
                    <div className="bb-row title-buy text-center">
                        <i className="fa fa-info-circle me-2" aria-hidden="true" style={{ color: '#0e78cf' }} />
                        <span>Xem thêm nhều sản phẩm khác trong <b>Cửa hàng</b></span>
                    </div>
                    <div className="bb-item my-3" style={{ paddingLeft: '15px' }}>
                        <div className="current-bidder">
                            <div className="bb-title is-label">
                                <span className="current-bid bid-box-label">Giá của sản phẩm (VNĐ):</span>
                            </div>
                            <div className="bb-content my-2">
                                <div className="bin-price bin-price-centered fw-bold">
                                    <span>{FormatMoney(newTotalPrice)}</span>
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
                                    <div className="ms-1" style={{ marginTop: '37px', float: 'right' }}>
                                        <span className="current-bid bid-box-label" style={{ color: '#788088', fontWeight: 600, fontSize: '11pt', padding: '3px 0px' }}>&nbsp;</span>
                                        <a className="btn btn-primary me-4" onClick={handleAddCartItem}>Thêm vào giỏ hàng</a>
                                    </div>
                                    {checkQuantity ? null: <ValidationQuantity message={errorMess} />}
                                </div>
                            </form>
                            <div className="bin-qty text-center mt-3">
                                số lượng còn lại <strong>{product.available}</strong></div>
                        </div>
                    </div>
                </div>
                <div className="bidding-actions mt-4">
                    <div className="watchlist-action">
                        <div className="watcher-btn text-center">
                            <a className="watch-button" href="#">
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
            <ToastContainer />
        </div>
    );
}

export default Buy;