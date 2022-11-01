import './AdminInfo.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux/es/exports';
import { getAccount } from '../../../../products/redux/selector';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import ModalDetailAccount from '../../../modal/account/ModalDetail';

function AdminInfo() {
    const dispatch = useDispatch();
    const account = useSelector(getAccount);

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginUser');
    };
    const [showDetail, setShowDetail] = useState({
        showdetail: false,
        accountId: 0,
    });
    const handleCloseDetailAccount = () => setShowDetail(false);
    const { accounts, showdetail, accountId } = showDetail;

    return (
        <>
            <div className="d-flex align-items-center me-3">
                <div className="adminInfoGroup">
                    <span className="ms-2 fw-bold">{account.username}</span>
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-black-400" />
                    <div className="adminInfo-dropdown">
                        <ul>
                            <li>
                                <button
                                    onClick={() =>
                                        setShowDetail({
                                            accounts: accounts,
                                            showdetail: true,
                                            accountId: account.id,
                                        })
                                    }
                                >
                                    <i class="fa-solid fa-user-tie"></i> Hồ sơ
                                </button>
                            </li>
                            <button
                                onClick={function () {
                                    Swal.fire({
                                        icon: 'warning',
                                        title: '<br/> Bạn có chắc đăng xuất không?',
                                        showDenyButton: true,
                                        showCancelButton: true,
                                        showConfirmButton: false,
                                        denyButtonText: `Đăng xuất`,
                                    }).then((result) => {
                                        if (result.isDenied) {
                                            toast.success(`Đăng xuất thành công!`);
                                            setTimeout(() => {
                                                navigate('/login');
                                                logout();
                                            }, 2000);
                                        }
                                    });
                                }}
                            >
                                <i class="fa-solid fa-right-from-bracket"></i> Đăng Xuất
                            </button>
                        </ul>
                    </div>
                </div>
                <ToastContainer autoClose={1500} />
                <ModalDetailAccount
                    showDetail={showdetail}
                    accountId={accountId}
                    accounts={accounts}
                    onCloseDetailAccount={handleCloseDetailAccount}
                />
            </div>
        </>
    );
}

export default AdminInfo;
