import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { getShowInfoProduct, getProduct } from './../redux/selector';
import { setShowInfoProduct, setCheckProduct } from './../redux/actions';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ProductService from "../service/Product/ProductService";
import { Carousel } from './../Hooks/Hooks';
import Buy from "./Buy";

const InfoProductModal = () => {
    const dispatch = useDispatch();

    const [medias, setMedias] = useState([])
    const product = useSelector(getProduct);
    useEffect(() => {
        try {
            async function getMediaProduct() {
                let mediaRes = await ProductService.getAllMediaByProductId(product.id)
                setMedias(mediaRes.data);
            };
            getMediaProduct();
        } catch (error) {
            console.log(error);
        }
    }, [product]);


    const handleClose = () => {
        dispatch(setShowInfoProduct(false));
        dispatch(setCheckProduct(false))
    };

    const showInfoProduct = useSelector(getShowInfoProduct);

    let max_visibility = medias.length;
    return (
        <>
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
                                <div className="slide-image">
                                    <Carousel maxVisibility={max_visibility}>
                                        {medias.map((media, i) => (
                                            <img key={i} src={media.fileUrl} alt="" />
                                        ))}
                                    </Carousel>
                                    {/* <img src={product.image} alt={product.slug} id='img-info-product' /> */}
                                </div>

                                <div className="title-modal">Người đăng: </div>
                                <p>{product.createBy}</p>

                                <div className="title-modal">Loại sản phẩm: </div>
                                <p>{product.action}</p>

                                <div className="title-modal">Danh mục: </div>
                                <p>{product.category.title}</p>

                            </Col>
                            <Col xs={12} md={4}>
                                <Buy product={product} />
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

export default InfoProductModal;