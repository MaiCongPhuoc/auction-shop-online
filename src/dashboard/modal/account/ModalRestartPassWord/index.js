import { Button, Modal } from 'react-bootstrap';

function ModalRestartPassword(props) {
    const { showRestart, onCloseRestarPassword } = props;
    return (
        <Modal show={showRestart} onHide={onCloseRestarPassword} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Add Product</Modal.Title>
            </Modal.Header>
            <form>
                <Modal.Body>
                    <div className="modal-body">
                        <div class="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                                Nhập Password:
                            </label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" id="inputPassword" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-3 col-form-label">
                                Nhập lại Password:
                            </label>
                            <div className="col-sm-8">
                                <input type="password" className="form-control" id="inputPassword" />
                            </div>
                        </div>
                    </div>
                    {/* <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" className="btn btn-outline-info">
                            Save
                        </button>
                    </div> */}
                </Modal.Body>
            </form>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseRestarPassword}>
                    Close
                </Button>
                <Button type="button" className="btn btn-primary">
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalRestartPassword;
