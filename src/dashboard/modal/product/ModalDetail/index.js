import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalDetailProduct(props) {
    const {product, showdetail, handleCloseDetail} = props;
    console.log(product);

    return (
        <Modal show={showdetail} onHide={handleCloseDetail} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Detail Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={product.image} className="img-fluid rounded-start" alt="Ảnh sản phẩm" />
                    </div>
                    <div className="col-md-7 ml-5">
                        <div className="row">
                            <h5 className="col-sm-4">Title:</h5>
                            <p className="col-sm-8">{product.title}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Ngày Tạo:</h5>
                            <p className="col-sm-8">{product.createdAt}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Người tạo:</h5>
                            <p className="col-sm-8">{product.createdBy}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Ngày Sửa Đổi Gần Nhất</h5>
                            <p className="col-sm-8">{product.updateAt}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Người Sửa Đổi:</h5>
                            <p className="col-sm-8">{product.updateBy}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Đấu Giá / Bán</h5>
                            <p className="col-sm-8">{product.action ? 'Bán' : 'Đấu Giá'}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Số Lượng Còn Lại</h5>
                            <p className="col-sm-8">{product.available}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Đã Kiểm Duyệt:</h5>
                            <p className="col-sm-8">{product.moderation ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt'}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Giá:</h5>
                            <p className="col-sm-8">{product.price}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Đã bán:</h5>
                            <p className="col-sm-8">{product.sold}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Thể Loại:</h5>
                            <p className="col-sm-8">{product.category && product.category.title}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-4">Mô tả:</h5>
                            <p className="col-sm-8">{product.description}</p>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDetail}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetailProduct;
