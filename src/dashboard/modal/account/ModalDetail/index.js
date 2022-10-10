import { Button, Modal } from "react-bootstrap";

function ModalDetail(props) {
    const {product, showDetail, onCloseDetailAccount} = props;
    return (
        <Modal show={showDetail} onHide={onCloseDetailAccount} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row g-0">
                    {/* <div className="col-md-3">
                        <img src={product.image} className="img-fluid rounded-start" alt="Ảnh sản phẩm" />
                    </div>
                    <div className="col-md-8 ml-3">
                        <div className="row">
                            <h5 className="col-sm-3">Title:</h5>
                            <p className="col-sm-9">{product.title}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Ngày Tạo:</h5>
                            <p className="col-sm-9">{product.createdAt}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Người tạo:</h5>
                            <p className="col-sm-9">{product.createdBy}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Ngày Sửa Đổi Gần Nhất</h5>
                            <p className="col-sm-9">{product.updateAt}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Người Sửa Đổi:</h5>
                            <p className="col-sm-9">{product.updateBy}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Đấu Giá / Bán</h5>
                            <p className="col-sm-9">{product.action ? 'Bán' : 'Đấu Giá'}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Số Lượng Còn Lại</h5>
                            <p className="col-sm-9">{product.available}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Đã Kiểm Duyệt:</h5>
                            <p className="col-sm-9">{product.moderation ? 'Đã kiểm duyệt' : 'Chưa kiểm duyệt'}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Giá:</h5>
                            <p className="col-sm-9">{product.price}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Đã bán:</h5>
                            <p className="col-sm-9">{product.sold}</p>
                        </div>
                        <div className="row">
                            <h5 className="col-sm-3">Thể Loại:</h5>
                            <p className="col-sm-9">{product.category && product.category.title}</p>
                        </div>
                    </div> */}
                    <h1>modal detail</h1>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseDetailAccount}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetail;
