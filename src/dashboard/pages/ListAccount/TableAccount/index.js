import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AccountService from '../../../services/AccountService';
import Spiner from '../../../Spiner';
import ModalDetailAccount from '../../../modal/account/ModalDetail';
import ModalAddAccount from '../../../modal/account/ModalAdd';
import ModalEditAccount from '../../../modal/account/ModalEdit';
import ModalRestartPassword from '../../../modal/account/ModalRestartPassWord';
import Swal from 'sweetalert2';
import '../../pages.css';
import { deleteAccount, listAccount } from '../../../redux/actions';

function BangTaiKhoan() {
    const dispatch = useDispatch();
    const [state, setState] = useState({
        loading: false,
        accounts: [],
        errorMessage: '',
    });
    const [reRender, setReRender] = useState(false);

    // ========================= API Account ===========================

    // useEffect(() => {
    //     try {
    //         setState({ ...state, loading: true });
    //         async function getData() {
    //             let accountRes = await AccountService.getAccount();
    //             setState({
    //                 ...state,
    //                 accounts: accountRes.data,
    //                 loading: false,
    //             });
    //         }
    //         getData();
    //     } catch (error) {
    //         setState({
    //             ...state,
    //             loading: false,
    //             errorMessage: error.message,
    //         });
    //     }
    // }, []);

    //modal detail
    const [showDetail, setShowDetail] = useState({
        showdetail: false,
        accountId: 0,
    });
    const handleCloseDetailAccount = () => setShowDetail(false);

    //modal add
    const [showAdd, setShowAdd] = useState(false);
    const hanldeCloseAddAccount = () => setShowAdd(false);

    //modal edit
    const [showEdit, setShowEdit] = useState({
        account: {},
        accountEditId: 0,
        showedit: false,
    });
    const hanldeCloseEditAccount = () => setShowEdit(false);

    //modal restartPassword
    const [showRestart, setShowRestart] = useState(false);
    const hanldCloseRestartPassword = () => setShowRestart(false);
    function handleClick(id) {
        Swal.fire({
            title: 'Bạn chắc chứ?',
            type: 'warning',
            text: 'Bạn không thể hàn tác lại điều này!',
            footer: '',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi muốn Xóa?',
        }).then((result) => {
            if (result.value) {
                async function daleteAcount() {
                    await AccountService.getDeleteAccount(id);
                    setReRender(!reRender);
                }
                daleteAcount();
                Swal.fire('Đã xóa!', 'Xóa thành công!', 'success');
            }
        });
    }

    const { loading, accounts, errorMessage } = state;

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getAccounts() {
                let account = await AccountService.getAccount();
                setState({ ...state, loading: false, accounts: account.data });
            }
            getAccounts();
        } catch (error) {}
        dispatch(listAccount());
        console.log('reRender');
    }, [showAdd, showEdit, reRender]);

    const { accountEditId, showedit } = showEdit;
    const { account, showdetail, accountId } = showDetail;
    console.log('accounts: ', accounts);
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between">
                <h1 className="h3 mb-2 text-gray-800">Danh sách tài khoản</h1>
                <form className=" w-25 mr-5">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control bg-light small"
                            placeholder="Tìm kiếm người dùng..."
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <FontAwesomeIcon icon={faSearch} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {/* {loading ? (
                <Spiner />
            ) : ( */}
            <div className="shadow mb-4 cur-div" style={{ cursor: 'auto !important' }}>
                <div className="card-header py-3 d-flex justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách tài khoản</h6>
                    <div>
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-primary" onClick={() => setShowAdd(true)}>
                            Add
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Tên đầy đủ</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Quyền</th>
                                    <th>Tỉnh/Thành Phố</th>
                                    <th>Quận/Huyện</th>
                                    <th>Thôn/ Xã</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accounts === undefined
                                    ? ''
                                    : accounts.map((account) => (
                                          <tr key={account.id}>
                                              <td>
                                                  <button
                                                      onClick={() =>
                                                          setShowDetail({
                                                            account: account,
                                                              showdetail: true,
                                                              accountId: account.id,
                                                          })
                                                      }
                                                      className="btnDetailProduct"
                                                  >
                                                      <img
                                                          src={account.avatar}
                                                          alt="anh tai khoan"
                                                          style={{ width: '100px' }}
                                                      />
                                                  </button>
                                              </td>
                                              <td>
                                                  <strong>{account.fullName}</strong>
                                              </td>
                                              <td>{account.email}</td>
                                              <td className="text-end">{account.phone}</td>
                                              <td>{account.role.code}</td>
                                              <td>{account.locationregion.provinceName}</td>
                                              <td>{account.locationregion.districtName}</td>
                                              <td>{account.locationregion.wardName}</td>
                                              <td className="text-center">
                                                  <button
                                                      className="btn btn-outline-secondary"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#btnEditAccount"
                                                      onClick={() =>
                                                          setShowEdit({
                                                              accountEditId: account.id,
                                                              showedit: true,
                                                          })
                                                      }
                                                  >
                                                      Sửa
                                                  </button>
                                                  <button
                                                      className="btn btn-outline-danger ml-2"
                                                      onClick={() => handleClick(account.id)}
                                                  >
                                                      Xóa
                                                  </button>
                                                  <button
                                                      className="btn btn-outline-info ml-2"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#btnDoiMK"
                                                  >
                                                      Đổi MK
                                                  </button>
                                              </td>
                                          </tr>
                                      ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Tên đầy đủ</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Quyền</th>
                                    <th>Tỉnh/Thành Phố</th>
                                    <th>Quận/Huyện</th>
                                    <th>Thôn/ Xã</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
            {/* )} */}

            {/* ========================= Modal Edit ========================= */}
            <ModalEditAccount
                showEdit={showedit}
                accountEditId={accountEditId}
                onCloseEditAccount={hanldeCloseEditAccount}
            />

            {/*==================== Modal Add ===========================*/}
            <ModalAddAccount showAdd={showAdd} onCloseAddAccount={hanldeCloseAddAccount} />

            {/* ====================== Modal RestartPassword ======================== */}
            <ModalRestartPassword showRestart={showRestart} onCloseRestarPassword={hanldCloseRestartPassword} />

            {/* ======================= Modal detail ======================= */}
            <ModalDetailAccount showDetail={showdetail} accountId={accountId} account={account} onCloseDetailAccount={handleCloseDetailAccount} />
        </div>
    );
}

export default BangTaiKhoan;
