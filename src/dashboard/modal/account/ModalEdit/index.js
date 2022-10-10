import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalEditProduct(props) {
    useEffect(() => {}, []);

    const { showEdit, onCloseEditAccount } = props;

    return (
        <Modal show={showEdit} onHide={onCloseEditAccount} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                    <div className="modal-body">
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên đầy đủ
                                </label>
                                <input type="text" className="form-control" id="addTitle" placeholder="Tên đầy đủ..." />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Email
                                </label>
                                <input type="text" className="form-control" id="addPrice" placeholder="Nhập email..." />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addAvailable" className="form-label text-dark font-weight-bold ml-2">
                                    Số điện thoại
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="addAvailable"
                                    placeholder="Số lượng..."
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Quyền
                                </label>
                                <div className="">
                                    <select className="form-select">
                                        <option value={-1} key={-1} selected disabled>
                                            Chọn
                                        </option>
                                        <option value="2" key="2">
                                            Admin
                                        </option>
                                        <option value="3" key="3">
                                            User
                                        </option>
                                        <option value="3" key="3">
                                            Customer
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label htmlFor="addCateglory" className="form-label text-dark font-weight-bold ml-2">
                                    TP / Tỉnh thành
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
                            <div className="mb-3 col-4">
                                <label htmlFor="addCateglory" className="form-label text-dark font-weight-bold ml-2">
                                    Quận / Huyện
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
                            <div className="mb-3 col-4">
                                <label htmlFor="addCateglory" className="form-label text-dark font-weight-bold ml-2">
                                    Thôn / Xã
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
                                    Avatar
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
                    <Button variant="secondary" onClick={onCloseEditAccount}>
                        Close
                    </Button>
                    <Button type="button" className="btn btn-primary">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalEditProduct;
