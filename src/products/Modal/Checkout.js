import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, getShowModalCheckout } from "../redux/selector";
import { setShowCartModalCheckout } from './../redux/actions';
import { FormatMoney } from './../Hooks/Hooks';

const Checkout = ({ items }) => {

    const dispatch = useDispatch();

    const account = useSelector(getAccount);

    const handleClose = () => {
        dispatch(setShowCartModalCheckout(false))
    };
    const showModalCheckout = useSelector(getShowModalCheckout);

    console.log('items', items);
    return (
        <>
            <Modal
                size="xl"
                show={showModalCheckout}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton style={{ backgroundColor: '#004cbc' }}>
                    <Modal.Title style={{ color: '#fff' }}>Hoàn tất thông tin để mua hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-checkout-modal" style={{ backgroundColor: '#f2f2f2' }}>
                    <Container>
                        <Row>
                            <Col xs={12} md={7}>
                                <div className="items-checkout row mx-2 my-2">
                                    <b>Danh sách sản phẩm</b>
                                </div>
                                <div className="row mt-2" style={{ display: 'flex', alignItems: 'center', height: '80px', backgroundColor: '#fff', boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)' }}>
                                    <div className="item-info text-center col-7">Sản phẩm</div>


                                    <div className="item-info text-center col-2">Số lượng mua</div>


                                    <div className="item-info text-center col-3">Thành tiền</div>
                                </div>
                                {items.map((item => (
                                    <div className="row items-checkout-info my-2" key={item.id}>

                                        <div className="col-7" style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="col-3">
                                                <img className="item-info-image" src={item.product.image} alt="" />
                                            </div>
                                            <div className="col-9">
                                                <div>{item.product.title}</div>
                                                <div>{item.product.description}</div>
                                                <div className="item-category">{item.product.category.title}</div>
                                                <div className="fw-bold">{FormatMoney(item.product.price)} ₫</div>
                                            </div>
                                        </div>


                                        <div className="col-2 text-center">{item.quantity}</div>


                                        <div className="col-3 text-end">{FormatMoney(item.amountTransaction)} ₫</div>

                                    </div>
                                )))}

                            </Col>
                            <Col xs={12} md={5}>
                                <div className="row mx-2 my-2">
                                    <b>Thông tin người nhận</b>
                                </div>
                                <div className="row ms-1" style={{ backgroundColor: '#fff', boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)'}}>
                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                        <label htmlFor="fullNameRecipient" className="col-4 fullNameRecipient">Họ và tên: </label>
                                        <input type="text" className="form-control col-8" id="fullNameRecipient" style={{margin: '0', borderRadius: '5px'}} value={account.fullName}/>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: 100 }} variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default Checkout;