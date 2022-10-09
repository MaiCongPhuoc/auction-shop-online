import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

function ModalDetailProduct(a) {
    console.log(a);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (a) => {
        console.log(a);
        setShow(true)};
    return (
        <div
            className="modal fade"
            id="btnModalDetailProduct"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog-centered modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">
                            Chi tiết sản phẩm
                        </h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="row g-0">
                            <div className="col-md-3">
                                <img
                                    src="https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-x-new-1.jpg"
                                    className="img-fluid rounded-start"
                                    alt="..."
                                />
                            </div>
                            <div className="col-md-8 ml-3">
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                                <div className="row">
                                    <h5 className="col-sm-3">Card title:</h5>
                                    <p className="col-sm-9">This is a wider card with supporting text longer.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalDetailProduct;
