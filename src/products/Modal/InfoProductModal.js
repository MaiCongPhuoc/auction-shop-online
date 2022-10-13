import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getShowInfoProduct, getProduct } from './../redux/selector';
import { setProduct, setShowInfoProduct } from './../redux/actions';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ProductService from './../../dashboard/services/productService';

const InfoProductModal = () => {
    const [check, setCheck] = useState(false);

    const dispatch = useDispatch();

    const product = useSelector(getProduct);
    useEffect(() => {
        try {
            if (product.length > 0) {
                setCheck(true);
            } else {
                setCheck(false);
            }
        } catch (error) {
            console.log(error);
        }
    }, [product])

    console.log(product);
    const handleClose = () => {
        dispatch(setShowInfoProduct(false));
    };




    const showInfoProduct = useSelector(getShowInfoProduct);
    return (
        <>
            {check ? (
                <Modal
                    size="xl"
                    show={showInfoProduct}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Thông tin sản phẩm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="show-info">
                        <Container>
                            <Row>
                                <Col xs={12} md={8}>
                                    <div className="title-modal mx-2 my-2">{product.title}</div>
                                    <img src={product.image} alt={product.slug} id='img-info-product' />

                                    <div className="title-modal">Người đăng: </div>
                                    <p>{product.createBy}</p>

                                    <div className="title-modal">Loại sản phẩm: </div>
                                    <p>{product.action}</p>

                                    <div className="title-modal">Danh mục: </div>
                                    <p>{product.category.title}</p>

                                    <div className="title-modal">Số lượng còn lại: </div>
                                    <p>{product.available}</p>

                                    <div className="title-modal">Giá: </div>
                                    <p>{product.price}</p>
                                </Col>
                                <Col xs={12} md={4}>

                                </Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button style={{ width: 100 }} variant="secondary" onClick={handleClose}>
                            Đóng
                        </Button>
                        {/* <Button variant="outline-primary">Understood</Button> */}
                    </Modal.Footer>
                </Modal>
            ) : null}
        </>


    )
}

export default InfoProductModal;