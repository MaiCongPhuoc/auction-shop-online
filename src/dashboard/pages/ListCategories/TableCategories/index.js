import React from 'react';
import { useEffect, useState } from 'react';
import Moment from 'moment';
import Spiner from '../../../Spiner';
import Swal from 'sweetalert2';
import '../../pages.css';

import CategoryService from '../../../services/Category';
import ModalEditCategory from '../../../modal/category/ModalEdit/index';
import ModalAddCategory from '../../../modal/category/ModalAdd/index';

function TableCategories() {
    Moment.locale('vi');
    const [state, setState] = useState({
        loading: false,
        categorys: [],
        currentPage: 1,
        recordPerPage: 5,
        search: '',
        errorMessage: '',
        totalPages: 0,
    });
    const [reRender, setReRender] = useState(false);
    //modal add
    const [showAdd, setShowAdd] = useState(false);
    const handCloseAdd = () => setShowAdd(false);

    //modal edit
    const [showEdit, setShowEdit] = useState({
        categoryEditId: 0,
        showedit: false,
    });
    const { categoryEditId, showedit } = showEdit;
    const handleCloseEdit = () => setShowEdit({ ...showEdit, showedit: false });
    // const handleCloseEdit = () => setShowEdit(false);

    const notify = (id) =>
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: 'Bạn sẽ không thể hoàn lại thao tác này!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng, Tôi xóa nó!',
        }).then((result) => {
            if (result.isConfirmed) {
                async function deleteCategory(id) {
                    await CategoryService.deleteCategory(id);
                    setReRender(!reRender);
                }
                deleteCategory(id);
                Swal.fire('Đã xóa Thành công!', 'Sản phẩm của bạn đã bị xóa!', 'success');
            }
        });

    // useEffect(() => {
    //     try {
    //         setState({ ...state, loading: true });
    //         getCategoryByPagination(state.currentPage);
    //     } catch (error) {
    //         setState({
    //             ...state,
    //             loading: false,
    //             errorMessage: error.message,
    //         });
    //     }
    // }, [showAdd, showEdit, reRender]);

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let category = await CategoryService.getCategory();
                // console.log('category.data useEffect: ', category.data);
                setState({
                    ...state,
                    categorys: category.data,
                    loading: false,
                });
            }
            getData();
            getCategoryByPagination(state.currentPage);
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message,
            });
        }
    }, [showAdd, showEdit, reRender]);

    async function getCategoryByPagination(currentPage) {
        state.currentPage = currentPage - 1;
        let categoryData = await CategoryService.getDataTableCategory(
            state.search,
            state.currentPage,
            state.recordPerPage,
        );
        setState({
            ...state,
            categorys: categoryData.data.content,
            totalPages: categoryData.data.totalPages,
            totalElements: categoryData.data.totalElements,
            currentPage: categoryData.data.number + 1,
            loading: false,
        });
    }

    const showNextPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (state.search !== '') {
                getCategoryByPagination(current + 1);
            } else {
                searchBook(current + 1);
            }
        }
    };

    const showLastPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (!state.search) {
                getCategoryByPagination(Math.ceil(total / record));
            } else {
                searchBook(Math.ceil(total / record));
            }
        }
    };

    const showFirstPage = () => {
        let firstPage = state.currentPage - 1;
        if (state.currentPage > firstPage) {
            if (state.search === '') {
                getCategoryByPagination(firstPage);
            } else {
                searchBook(firstPage);
            }
        }
    };

    const showPrevPage = () => {
        let prevPage = 1;
        let curent = state.currentPage;
        if (curent > prevPage) {
            if (state.search === '') {
                getCategoryByPagination(curent - curent + 1);
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
        if (document.querySelector('#search').value === '') {
            document.querySelector('#select').value = '-1';
        }
        currentPage = currentPage - 1;
        async function getDataTable() {
            let dataTable = await CategoryService.getDataTableCategory(state.search, currentPage, state.recordPerPage);
            setState({
                ...state,
                categorys: dataTable.data.content,
                totalPages: dataTable.data.totalPages,
                totalElements: dataTable.data.totalElements,
                currentPage: dataTable.data.number + 1,
            });
        }
        getDataTable();
    };

    const resetBook = (currentPage) => {
        setState({ ...state, search: '' });
        getCategoryByPagination(state.currentPage);
    };

    const { loading, categorys, currentPage, recordPerPage, search, errorMessage, totalPages } = state;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between">
                <h2>DANH SÁCH THỂ LOẠI</h2>
                <div className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 navbar-search"></div>
            </div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="shadow mb-4 cur-div">
                    <div className="card-header py-3 d-flex justify-content-between">
                        <div className="input-group">
                            <input
                                type="text"
                                id="search"
                                name="search"
                                size="50"
                                className="form-control bg-light small"
                                placeholder="Tìm kiếm theo tên"
                                onChange={searchBox}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-primary ml-1"
                                    type="button"
                                    name="search"
                                    onClick={searchBook}
                                >
                                    <i className="fas fa-search fa-sm" />
                                </button>
                            </div>
                        </div>
                        <div className="col-3"></div>
                        <div className="d-flex align-items-center w-50">
                            <button type="button" className="btn btn-outline-success" onClick={() => setShowAdd(true)}>
                                <i className="fa-solid fa-plus me-2" title="Tạo"></i>Tạo danh mục
                            </button>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Tên</th>
                                        <th className="text-center">Thao tác</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categorys.map((cate) => (
                                        <tr key={cate.id}>
                                            <td className="text-center">{cate.id}</td>
                                            <td className="text-center">{cate.title}</td>
                                            <td className="text-center">
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={() =>
                                                        setShowEdit({
                                                            ...showEdit,
                                                            categoryEditId: cate.id,
                                                            showedit: true,
                                                        })
                                                    }
                                                >
                                                    <i className="fa-solid fa-pen-to-square" title="Cập nhật"></i>
                                                </button>
                                                {/* <button
                                                    className="btn btn-outline-danger ml-2"
                                                    onClick={() => notify(cate.id)}
                                                >
                                                    <i className="fa-solid fa-trash danger" title="Delete"></i>
                                                </button> */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div
                                style={{
                                    float: 'left',
                                    fontFamily: 'monospace',
                                    color: '#0275d8',
                                }}
                            >
                                Trang: {currentPage} / {totalPages}
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
                                                <i class="fa-solid fa-backward-fast"></i>
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showFirstPage}
                                            >
                                                <i class="fa-solid fa-backward-step"></i>
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showNextPage}
                                            >
                                                <i class="fa-solid fa-forward-step"></i>
                                            </a>
                                        </li>
                                        <li class="page-item">
                                            <a
                                                type="button"
                                                class="page-link"
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showLastPage}
                                            >
                                                <i class="fa-solid fa-forward-fast"></i>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <ModalEditCategory categoryEditId={categoryEditId} showedit={showedit} handleCloseEdit={handleCloseEdit} />
            <ModalAddCategory show={showAdd} handleClose={handCloseAdd} />
        </div>
    );
}

export default TableCategories;
