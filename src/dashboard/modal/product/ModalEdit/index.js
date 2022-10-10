import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalEditProduct(props) {
    useEffect(() => {}, []);

    const { showEdit, handleCloseEdit } = props;

    return (
        <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                    <div className="modal-body">
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên sản phẩm
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="addTitle"
                                    placeholder="Tên sản phẩm..."
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Giá
                                </label>
                                <input type="number" className="form-control" id="addPrice" placeholder="Giá..." />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label htmlFor="addAvailable" className="form-label text-dark font-weight-bold ml-2">
                                    Số Lượng
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="addAvailable"
                                    placeholder="Số lượng..."
                                />
                            </div>
                            <div className="form-check form-switch mb-3 col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Bày bán/Đấu giá
                                </label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault1"
                                    />
                                    <label className="form-check-label" htmlfor="flexRadioDefault1">
                                        Bán
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="flexRadioDefault2"
                                        checked
                                    />
                                    <label className="form-check-label" htmlfor="flexRadioDefault2">
                                        Đấu giá
                                    </label>
                                </div>
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="addCateglory" className="form-label text-dark font-weight-bold ml-2">
                                    Thể loại
                                </label>
                                <select className="form-select">
                                    <option value={-1} key={-1} selected disabled>
                                        Chọn
                                    </option>
                                    <option value="2" key="2">
                                        Điện thoại
                                    </option>
                                    <option value="3" key="3">
                                        Máy tính bảng
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-12">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    Images
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    id="addImage"
                                    placeholder="Vui lòng chọn file..."
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button type="button" className="btn btn-primary">
                        Create
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalEditProduct;
