import './AdminInfo.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAccount } from '../../../../products/redux/selector';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { loginStatus, setAccount } from '../../../../products/redux/actions';
import ModalAccountResetPassword from './modalAccountInfo/ModalAccountResetPassword';
import ModalDetailAccountInfo from './modalAccountInfo/ModalAccountInfo';
import ModalEditAccount from './modalAccountInfo/ModalEditAccount';

function AdminInfo() {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginUser');
    };

    const hanldeCloseEditAccount = () => setShowEdit(false);
    const [showEdit, setShowEdit] = useState({
        account: {},
        accountEditId: 0,
        showedit: false,
    });
    const { accountEditId, showedit } = showEdit;

    const hanldeCloseEditPasswordAccount = () => setShowEditPassword(false);
    const [showEditPassword, setShowEditPassword] = useState({
        account: {},
        accountEditPasswordId: 0,
        showeditpassword: false,
    });
    const { accountEditPasswordId, showeditpassword } = showEditPassword;

    const [showDetail, setShowDetail] = useState({
        showdetail: false,
        accountId: 0,
    });
    const { accounts, showdetail, accountId } = showDetail;

    const handleCloseDetailAccount = () => setShowDetail(false);
    return (
        <>
            <div className="d-flex align-items-center me-3">
                <div className="adminInfoGroup">
                    <span className="ms-2 fw-bold sp-adminInfo">{account.username} </span>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-black-400" />
                    <div className="adminInfo-dropdown">
                        <ul>
                            <li>
                                <button
                                    className="btn-adminInfo"
                                    onClick={() =>
                                        setShowDetail({
                                            accounts: accounts,
                                            showdetail: true,
                                            accountId: account.id,
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-user-tie"></i> H??? s??
                                </button>
                                <br />
                                <button
                                    className="btn-adminInfo"
                                    onClick={() =>
                                        setShowEdit({
                                            accountEditId: account.id,
                                            showedit: true,
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-user-pen"></i> C???p nh???t
                                </button>
                                <br />
                                <button
                                    className="btn-adminInfo"
                                    onClick={() =>
                                        setShowEditPassword({
                                            accountEditPasswordId: account.id,
                                            showeditpassword: true,
                                        })
                                    }
                                >
                                    <i class="fa-solid fa-key"></i> ?????i m???t kh???u
                                </button>
                            </li>
                            <button
                                className="btn-adminInfo"
                                onClick={function () {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: '<br/> B???n c?? ch???c ????ng xu???t kh??ng?',
                                        showDenyButton: true,
                                        showCancelButton: true,
                                        showConfirmButton: false,
                                        denyButtonText: `????ng xu???t`,
                                        cancelButtonText: 'Kh??ng',
                                    }).then((result) => {
                                        if (result.isDenied) {
                                            toast.success(`????ng xu???t th??nh c??ng!`);
                                            dispatch(loginStatus(false));
                                            dispatch(setAccount({ NOTFOUND: '' }));
                                            function eraseCookie(name) {
                                                document.cookie = name + '=; Max-Age=0';
                                            }
                                            setTimeout(() => {
                                                eraseCookie('JWT');
                                                navigate('/login');
                                                logout();
                                            }, 2000);
                                        }
                                    });
                                }}
                            >
                                <i className="fa-solid fa-right-from-bracket"></i> ????ng Xu???t
                            </button>
                        </ul>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
                <ModalAccountResetPassword
                    showEditPassword={showeditpassword}
                    accountEditPasswordId={accountEditPasswordId}
                    onCloseEditPasswordAccount={hanldeCloseEditPasswordAccount}
                />
                <ModalDetailAccountInfo
                    showDetail={showdetail}
                    accountId={accountId}
                    account={account}
                    onCloseDetailAccount={handleCloseDetailAccount}
                />
                {account.email === undefined ? null : (
                    <ModalEditAccount
                        showEdit={showedit}
                        accountEditId={accountEditId}
                        onCloseEditAccount={hanldeCloseEditAccount}
                        account={account}
                    />
                )}
            </div>
        </>
    );
}

export default AdminInfo;
