import './ClientInfo.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAccount } from '../../../../products/redux/selector';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';
import ModalDetail from './ModalClientInfo/ModalClientInfo';
import { loginStatus, setAccount, setWatchLists } from '../../../../products/redux/actions';
import ModalClientResetPassword from './ModalClientInfo/ModalClientResetPassword';
import ModalEditClient from './ModalClientInfo/ModalEditClient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBill1 } from '@fortawesome/free-regular-svg-icons';
import ModalClientDeposit from './ModalClientInfo/ModalClientDeposit';

function ClientInfo() {
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
    const hanldeCloseDeposit = () => setShowDeposit(false);
    const [showDeposit, setShowDeposit] = useState({
        accountDepositId: 0,
        showeDeposit: false,
    });
    const { accountDepositId, showeDeposit } = showDeposit;
    const [showDetail, setShowDetail] = useState({
        showdetail: false,
        accountId: 0,
    });
    const { accounts, showdetail, accountId } = showDetail;

    const handleCloseDetailAccount = () => setShowDetail(false);
    return (
        <>
            <div className="d-flex align-items-center me-3">
                <div className="clientInfoGroup">
                    <span className="ms-2 fw-bold sp-clientInfo">{account.username} </span>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-black-400" />
                    <div className="clientInfo-dropdown">
                        <ul>
                            <li>
                                <button
                                    className="btn-clientInfo"
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
                                    className="btn-clientInfo"
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
                                    className="btn-clientInfo"
                                    onClick={() =>
                                        setShowEditPassword({
                                            accountEditPasswordId: account.id,
                                            showeditpassword: true,
                                        })
                                    }
                                >
                                    <i className="fa-solid fa-key"></i> ?????i m???t kh???u
                                </button>
                                <br />
                                <button
                                    className="btn-clientInfo"
                                    onClick={() =>
                                        setShowDeposit({
                                            accountDepositId: account.id,
                                            showeDeposit: true,
                                        })
                                    }
                                >
                                    <FontAwesomeIcon icon={faMoneyBill1} /> N???p ti???n
                                </button>
                                <br />
                                <button
                                    className="btn-clientInfo"
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
                                                dispatch(setWatchLists([]));
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
                            </li>
                        </ul>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
                {account.email === undefined ? null : (
                    <ModalEditClient
                        showEdit={showedit}
                        accountEditId={accountEditId}
                        onCloseEditAccount={hanldeCloseEditAccount}
                        account={account}
                    />
                )}
                <ModalDetail
                    showDetail={showdetail}
                    accountId={accountId}
                    account={account}
                    onCloseDetailAccount={handleCloseDetailAccount}
                />
                <ModalClientResetPassword
                    showEditPassword={showeditpassword}
                    accountEditPasswordId={accountEditPasswordId}
                    onCloseEditPasswordAccount={hanldeCloseEditPasswordAccount}
                />
                <ModalClientDeposit
                    accountDepositId={accountDepositId}
                    showeDeposit={showeDeposit}
                    onCloseDeposit={hanldeCloseDeposit}
                />
            </div>
        </>
    );
}

export default ClientInfo;
