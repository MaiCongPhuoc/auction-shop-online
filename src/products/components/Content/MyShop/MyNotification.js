import React, { useEffect, useState } from "react";
import { Button, Collapse, Form, FormLabel } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FormatMoney } from "../../../Hooks/Hooks";
import { getOpenSidebar, getReloadOrder } from "../../../redux/selector";
import EmptyOrder from "../../Loading/EmptyOrder";
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from "react-tooltip";
import OrdersDetailService from './../../../service/OrdersDetail/OrderDetail';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { setReloadOrder } from "../../../redux/actions";

function MyNotification({ orderDetails }) {
    const dispatch = useDispatch();
    const openSidebar = useSelector(getOpenSidebar);

    const notifySuccess = (text) =>
        toast.success(`Đã thay đổi trạng thái đơn hàng thành ${text}`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const notifyWarn = (mess) =>
        toast.warn(`${mess}`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });

    const [orderChoice, setOrderChoice] = useState({});

    const [status, setStatus] = useState({
        id: null,
        name: null
    });

    const [loadStatus, setLoadStatus] = useState(false);

    useEffect(() => {
        if (openSidebar) {
            document.querySelector('#show-list-my-order-detail').style.marginLeft = '250px';
        }
        else {
            document.querySelector('#show-list-my-order-detail').style.marginLeft = '0';
        }
    }, [openSidebar]);

    const handleShowInfo = (orderDetail) => {
        if (document.getElementById(`info_my_order_${orderDetail.id}`).classList.contains('hide')) {
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.remove('hide');
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.add('show');
        } else {
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.remove('show');
            document.getElementById(`info_my_order_${orderDetail.id}`).classList.add('hide');
        }
    };

    const handleChangeStatus = (orderDetail) => {
        let choiceOrder = document.getElementById(`choice_order_${orderDetail.id}`);
        let statusChoice = choiceOrder.options[choiceOrder.selectedIndex].value;
        let nameStatus = choiceOrder.options[choiceOrder.selectedIndex].text;

        setOrderChoice(orderDetail);
        setStatus({
            id: statusChoice,
            name: nameStatus
        });
    };

    const handleUpdateOrder = (orderDetail) => {
        let choiceOrder = document.getElementById(`choice_order_${orderDetail.id}`);
        let statusChoice = choiceOrder.options[choiceOrder.selectedIndex].value;
        let nameStatus = choiceOrder.options[choiceOrder.selectedIndex].text;

        let newStatus = {
            id: statusChoice,
            name: nameStatus
        };
        setLoadStatus(true);
        try {
            OrdersDetailService.updateStatus(orderDetail.id, newStatus).then((res) => {
                notifySuccess(newStatus.name);
                setLoadStatus(true);
            }).catch((resp) => {
                notifyWarn(resp.response.data);
            });
        } catch (error) {
            console.log("Err:", error);
        }
    };
    console.log("ỏdẻ:", orderDetails);
    return (
        <>
            <div id="show-list-my-order-detail">
                <div className="container text-center">
                    <div className="fw-bold col-3" style={{ color: '#367289' }}>Đơn hàng đang chờ</div>
                    <hr />
                    <div className="row col-12 my-3" style={{ height: '50px' }}>
                        <span className="text-center col-4" id="image-order"> Sản phẩm</span>
                        <span className="text-center col-2" id="date-item-order">Thời gian mua</span>
                        <span className="text-center col-2" id="price-item-order">Số lượng</span>
                        <span className="text-center col-2" id="quantity-item-order">Tổng tiền</span>
                        <span className="text-center col-2" id="status-item-order">Người mua</span>
                    </div>
                    {
                        orderDetails.length > 0 ?
                            orderDetails.map((orderDetail, index) => (
                                <>
                                    <div
                                        className="col-12 order-item mt-2"
                                        key={index}
                                        onClick={() => handleShowInfo(orderDetail)}
                                        data-tip="Nhấn để xem thông tin đơn hàng"
                                        id={`order-detail-${orderDetail.id}`}
                                    >
                                        <Link className="col-4" to={`/product/the-shop/${orderDetail.product.slug}`}>
                                            <span
                                                style={{
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
                                        <span className="text-center col-2 fw-bold">{orderDetail.order.account.fullName}</span>
                                    </div>
                                    <div className="order-item my-order-action-dropdown hide" id={`info_my_order_${orderDetail.id}`}>
                                        <div className="action-group">
                                            <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                Xác nhận đơn hàng
                                            </div>
                                            <div className="action-item col-8" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <FormLabel style={{ margin: '0' }} className="col-2">Trạng thái</FormLabel>
                                                <Form.Select
                                                    id={`choice_order_${orderDetail.id}`}
                                                    onChange={() => handleChangeStatus(orderDetail)}
                                                    value={orderChoice.id === orderDetail.id ? (status.id ?? orderDetail.status.id) : undefined}
                                                    className="me-2 select-status col-3"
                                                    aria-label="Default select example"
                                                    defaultValue={orderDetail.status.id}
                                                >
                                                    <option value={7}>Đang chờ</option>
                                                    <option value={8}>Đang chuẩn bị</option>
                                                    <option value={9}>Đang giao hàng</option>
                                                    <option value={5}>Đã hoàn thành</option>
                                                    <option value={10}>Trả lại hàng</option>
                                                    <option value={11}>Thất lạc</option>
                                                </Form.Select>
                                                <button type="button" onClick={() => handleUpdateOrder(orderDetail)} className="col-2 btn btn-outline-success">Xác nhận</button>
                                            </div>
                                        </div>
                                        <div className="action-group">
                                            <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                Thông tin người nhận
                                            </div>
                                            <div className="action-item col-9" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <div>Họ và tên: {orderDetail.order.fullName}</div>
                                                <div>Số điện thoại: {orderDetail.order.phone}</div>
                                                <div>Email: {orderDetail.order.email}</div>
                                            </div>
                                        </div>
                                        <div className="action-group">
                                            <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                Địa chỉ giao hàng
                                            </div>
                                            <div className="action-item col-9" style={{ display: 'flex' }}>
                                                <div>{orderDetail.order.locationRegion.address},
                                                    {" "}{orderDetail.order.locationRegion.wardName},
                                                    {" "}{orderDetail.order.locationRegion.districtName},
                                                    {" "}{orderDetail.order.locationRegion.provinceName}
                                                </div>
                                            </div>
                                        </div>
                                        {orderDetail.order.description.length > 0 ? (
                                            <div className="action-group">
                                                <div className="ms-3 action-item fw-bold" style={{ color: '#ff523d' }}>
                                                    Lời nhắn
                                                </div>
                                                <div className="action-item col-9" style={{ display: 'flex' }}>
                                                    <div>
                                                        {orderDetail.order.description}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null}
                                    </div>
                                </>
                            )) : <EmptyOrder />
                    }
                    <ToastContainer />
                </div>
                <ReactTooltip />
            </div>
        </>
    );
}

export default MyNotification;