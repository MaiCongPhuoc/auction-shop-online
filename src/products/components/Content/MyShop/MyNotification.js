import React, { useEffect } from "react";

function MyNotification({orderDetails}) {
    
    return (
        <>
            <div id="show-list-my-order-detail">
                <div className="container text-center">
                    <div className="fw-bold col-3" style={{ color: '#367289' }}>Đơn hàng cần duyệt</div>
                    <div className="row col-12 my-3" style={{ height: '50px' }}>
                        <span className="text-center col-4" id="image-order"> Sản phẩm</span>
                        <span className="text-center col-2" id="date-item-order">Thời gian mua</span>
                        <span className="text-center col-2" id="price-item-order">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item-order">Tổng tiền</span>
                        <span className="text-center col-2" id="status-item-order">Trạng thái</span>
                    </div>
                    {/* {loadOrderDetails ? <LoadCart /> :
                        emptyOrderDetails ? <EmptyOrder /> :
                            listOrderDetails.map(orderDetail => (
                                <div
                                    className="row col-10 cart-item"
                                    key={orderDetail.id}
                                >
                                    <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                        <span style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }}
                                        >
                                            <div className="col-4">
                                                <img style={{
                                                    padding: '5px',
                                                    width: '100px',
                                                    height: '120px'
                                                }} src={orderDetail.product.image} alt="" />
                                            </div>
                                            <div className="text-start mx-2 col-9">
                                                <div>{orderDetail.product.title}</div>
                                                <div style={{ fontSize: 'small', color: 'blue' }}>Sản phẩm: {orderDetail.product.action ? 'Đấu giá' : 'Cửa hàng'}</div>
                                            </div>
                                        </span>
                                    </Link>
                                    <span className="text-center col-2 fw-bold">{orderDetail.createdAt}</span>
                                    <span className="text-center col-2 fw-bold">{orderDetail.quantity}</span>
                                    <span className="text-end col-2 fw-bold">{FormatMoney(orderDetail.amountTransaction)} ₫</span>
                                    <span className="text-center col-2 fw-bold">{orderDetail.status.name}</span>
                                </div>
                            ))} */}
                </div>

            </div>
        </>
    );
}

export default MyNotification;