import React, { useState } from 'react';
import { FormatMoney } from '../Hooks/Hooks';

const Buy = ({ product }) => {
    const [totalPrice, setTotalPrice] = useState(product.price);

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
                                    <span>{FormatMoney(product.price)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="bb-row bb-bin-bid">
                            <form>
                                <input name="opt" type="hidden" defaultValue={688} />
                                <div className="bb-item" style={{ padding: '0 15px' }}>
                                    <div className="bb-item-qty" style={{ width: '30%', display: 'inline-block' }}>
                                        <span className="bid-box-label" style={{ color: '#788088', fontWeight: 600, fontSize: '11pt', padding: '3px 0px' }}>Quantity</span>
                                        <select className="quantity_control" name="qty" style={{ lineHeight: '30px' }}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={5}>5</option>
                                        </select>
                                    </div>
                                    <div className="ms-1" style={{ marginTop: '37px', float: 'right' }}>
                                        <span className="current-bid bid-box-label" style={{ color: '#788088', fontWeight: 600, fontSize: '11pt', padding: '3px 0px' }}>&nbsp;</span>
                                        <a className="btn btn-primary">Thêm vào giỏ hàng</a>
                                    </div>
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
        </div>
    );
}

export default Buy;