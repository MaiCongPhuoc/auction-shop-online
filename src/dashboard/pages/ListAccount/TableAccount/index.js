import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import AccountService from '../../../services/AccountService';
import Spiner from '../../../Spiner';
import ModalDetailAccount from '../../../modal/account/ModalDetail';
import ModalAddAccount from '../../../modal/account/ModalAdd';
import ModalEditAccount from '../../../modal/account/ModalEdit';
import ModalRestartPassword from '../../../modal/account/ModalRestartPassWord';
import Swal from 'sweetalert2';
import '../../pages.css';

function BangTaiKhoan() {
    const [state, setState] = useState({
        loading: false,
        accounts: [],
        currentPage: 1,
        recordPerPage: 5,
        search: '',
        errorMessage: '',
        totalPages: 0,
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
    
    // function handleClick(id) {
    //     Swal.fire({
    //         title: 'Bạn chắc chứ?',
    //         type: 'warning',
    //         text: 'Bạn không thể hàn tác lại điều này!',
    //         footer: '',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Vâng! Tôi muốn Xóa?',
    //     }).then((result) => {
    //         if (result.value) {
    //             async function daleteAcount() {
    //                 await AccountService.getDeleteAccount(id);
    //                 setReRender(!reRender);
    //             }
    //             daleteAcount();
    //             Swal.fire('Đã xóa!', 'Xóa thành công!', 'success');
    //         }
    //     });
    // }

    const notify = (id) =>
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        async function daleteAcount() {
            await AccountService.getDeleteAccount(id);
            setReRender(!reRender);
        }
        daleteAcount();
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });


    useEffect(() => {
        getProductsByPagination(state.currentPage);
    }, [showAdd, showEdit, reRender]);

    // data table
    async function getProductsByPagination(currentPage) {
        currentPage = currentPage - 1;
        console.log('currentPage: ', currentPage);
        let accountData = await AccountService.getDataTableAccount(
            state.search = '',
            currentPage,
            state.recordPerPage,
        );
        console.log('accountData.content: ',accountData.content);
        setState({
            ...state,
            accounts: accountData.data.content,
            totalPages: accountData.data.totalPages,
            totalElements: accountData.data.totalElements,
            currentPage: accountData.data.number + 1,
            loading: false,
        });
    }
    
    const showLastPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (state.search === '') {
                getProductsByPagination(Math.ceil(total / record));
            } else {
                searchBook(Math.ceil(total / record));
            }
        }
    };
    
    const showNextPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (state.search === '') {
                getProductsByPagination(current + 1);
            } else {
                searchBook(current + 1);
            }
        }
    };

    const showFirstPage = () => {
        let firstPage = state.currentPage - 1;
        if (state.currentPage > firstPage) {
            if (state.search === '') {
                getProductsByPagination(firstPage);
            } else {
                searchBook(firstPage);
            }
        }
    };

    const showPrevPage = () => {
        let prevPage = 1;
        let curent = state.currentPage;
        // console.log('curent showPrevPage: ', curent);
        if (curent > prevPage) {
            if (state.search === '') {
                getProductsByPagination(curent - curent + 1);
            } else {
                searchBook(curent - prevPage);
            }
        }
    };

    const searchBox = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };
    
    const searchBook = (currentPage) => {
        currentPage = currentPage - 1;
        async function getDataTable() {
            let dataTable = await AccountService.getDataTableAccount(state.search, currentPage, state.recordPerPage);
            setState({
                ...state,
                accounts: dataTable.data.content,
                totalPages: dataTable.data.totalPages,
                totalElements: dataTable.data.totalElements,
                currentPage: dataTable.data.number + 1,
            });
        }
        getDataTable();
    };
    
    const { accountEditId, showedit } = showEdit;
    const { account, showdetail, accountId } = showDetail;
    const { loading, accounts, currentPage, recordPerPage, search, errorMessage, totalPages, categories } = state;
    console.log('state: ', state);
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between">
                <h1 className="h3 mb-2 text-gray-800">Danh sách tài khoản</h1>
                <div className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input
                            type="text"
                            id="search"
                            name="search"
                            size="50"
                            className="form-control bg-light small"
                            placeholder="Tìm kiếm sản phẩm..."
                            onChange={searchBox}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button" name="search"
                             onClick={searchBook}
                             >
                                <i className="fas fa-search fa-sm" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <Spiner />
            ) : (
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
                            <table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
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
                                                          onClick={() => notify(account.id)}
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
                            <div
                                style={{
                                    float: 'left',
                                    fontFamily: 'monospace',
                                    color: '#0275d8',
                                }}
                            >
                                Trang {currentPage} Trên tổng số {totalPages}
                            </div>
                            <div style={{ float: 'right' }}>
                                <div class="clearfix"></div>
                                <nav aria-label="Page navigation example">
                                    <ul class="pagination">
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showPrevPage}
                                            >
                                                Trang đầu tiên
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showFirstPage}
                                            >
                                                Lùi
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showNextPage}
                                            >
                                                Tiếp
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showLastPage}
                                            >
                                                Trang cuối cùng
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
            <ModalDetailAccount
                showDetail={showdetail}
                accountId={accountId}
                account={account}
                onCloseDetailAccount={handleCloseDetailAccount}
            />
        </div>
    );
}

export default BangTaiKhoan;
