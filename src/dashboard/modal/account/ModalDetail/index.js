import { Button, Modal } from 'react-bootstrap';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import AccountService from '../../../services/AccountService';

function ModalDetail(props) {
    Moment.locale('vi');
    const { accountId, showDetail, onCloseDetailAccount } = props;
    console.log('props: ', accountId);
    const [accountDetail, setAccountDetail] = useState({});
    useEffect(() => {
        if (accountId !== 0 && accountId !== undefined) {
            try {
                async function getaccountDetail() {
                    let account = await AccountService.getAccountById(accountId);
                    setAccountDetail({ ...accountDetail, ...account.data });
                    console.log('vao day');
                }
                getaccountDetail();
            } catch (error) {
                console.log(error);
            }
        }
    }, [showDetail]);
    return (
        <Modal show={showDetail} onHide={onCloseDetailAccount} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Chi tiết về tài khoản</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {Object.getOwnPropertyNames(accountDetail).length === 0 ? (
                    ''
                ) : (
                    <div className="row g-0">
                        <div className="col-md-3">
                            <img src={accountDetail.avatar} className="img-fluid rounded-start" alt="Ảnh sản phẩm" />
                        </div>
                        <div className="col-md-8 ml-5">
                            <div className="row">
                                <h5 className="col-sm-3">Tên đầy đủ:</h5>
                                <p className="col-sm-9">{accountDetail.fullName}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Ngày Tạo:</h5>
                                <p className="col-sm-9">
                                    {Moment(accountDetail.createdAt).format('DD-MM-yyyy hh:mm:ss')}
                                </p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Người tạo:</h5>
                                <p className="col-sm-9">{accountDetail.createdBy}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Ngày Sửa Đổi Gần Nhất:</h5>
                                <p className="col-sm-9">
                                    {Moment(accountDetail.updateAt).format('DD-MM-yyyy hh:mm:ss')}
                                </p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Người Sửa Đổi:</h5>
                                <p className="col-sm-9">{accountDetail.updateBy}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Tên đăng nhập:</h5>
                                <p className="col-sm-9">{accountDetail.username}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Email:</h5>
                                <p className="col-sm-9">{accountDetail.email}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Số điện thoại:</h5>
                                <p className="col-sm-9">{accountDetail.phone}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Tình trạng:</h5>
                                <p className="col-sm-9">{accountDetail.blocked ? 'đã bị khóa' : 'chưa khóa'}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Quyền hạn:</h5>
                                <p className="col-sm-9">{accountDetail.role.code}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Tỉnh / thành phố:</h5>
                                <p className="col-sm-9">{accountDetail.locationRegion.provinceName}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Quận / huyện:</h5>
                                <p className="col-sm-9">{accountDetail.locationRegion.districtName}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Thôn / xã:</h5>
                                <p className="col-sm-9">{accountDetail.locationRegion.wardName}</p>
                            </div>
                            <div className="row">
                                <h5 className="col-sm-3">Địa chỉ:</h5>
                                <p className="col-sm-9">{accountDetail.locationRegion.address}</p>
                            </div>
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onCloseDetailAccount}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalDetail;
