import React from 'react';
import { useEffect, useState } from 'react';
import Moment from 'moment';
import Spiner from '../../../Spiner';
import Swal from 'sweetalert2';
import '../../pages.css';

import CategoryService from '../../../services/Category';
import ModalEditCategory from '../../../modal/category/ModalEdit';
import ModalAddCategory from '../../../modal/category/ModalAdd';

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
    const [showAdd, setShowAdd] = useState(false);
    const handCloseAdd = () => setShowAdd(false);

    const [showEdit, setShowEdit] = useState({
        categoryEditId: 0,
        showedit: false,
    });
    const { categoryEditId, showedit } = showEdit;
    const handleCloseEdit = () => setShowEdit({ ...showEdit, showedit: false });

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let category = await CategoryService.getCategory();
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

    const handleReset = () => {
        document.querySelector('#search').value = '';
        async function getDataTable() {
            let dataTable = await CategoryService.getDataTableCategory('', 0, 5);
            setState({
                ...state,
                categorys: dataTable.data.content,
                totalPages: dataTable.data.totalPages,
                totalElements: dataTable.data.totalElements,
                currentPage: dataTable.data.number + 1,
                search: '',
            });
        }
        getDataTable();
    };

    const searchBook = (currentPage) => {
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

    const { loading, categorys, currentPage, totalPages } = state;

    return (
        <div className="container-fluid">
            {loading ? (
                <Spiner />
            ) : (
                <div className="shadow mb-4 cur-div">
                    <div className="card-header d-flex justify-content-between">
                        <h5 className="font-weight-bold text-primary w-25" style={{ marginTop: '18px' }}>
                            Danh sách thể loại
                        </h5>
                        <div className="input-group">
                            <div className="col-3"></div>
                            <input
                                style={{ marginTop: '18px' }}
                                type="text"
                                id="search"
                                name="search"
                                size="75"
                                className="form-control bg-light small"
                                placeholder="Tìm kiếm thể loại..."
                                onChange={searchBox}
                            />
                            <div className="input-group-append">
                                <button
                                    style={{ marginTop: '18px' }}
                                    className="btn btn-primary ml-1"
                                    type="button"
                                    name="search"
                                    onClick={searchBook}
                                >
                                    <i className="fas fa-search fa-sm" />
                                </button>
                                <button
                                    style={{ marginTop: '18px' }}
                                    className="btn btn-info ml-1"
                                    type="button"
                                    name="search"
                                    onClick={handleReset}
                                >
                                    Đặt lại tìm kiếm
                                </button>
                            </div>
                            <div className="col-1"></div>
                            <div className="d-flex align-items-end">
                                <button
                                    type="button"
                                    className="btn btn-outline-success"
                                    onClick={() => setShowAdd(true)}
                                >
                                    <i className="fa-solid fa-plus me-2" title="Tạo"></i>Tạo
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th className="text-center">#</th>
                                        <th className="text-center">Tên thể loại</th>
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
                                
                                <nav>
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === 1
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showPrevPage}
                                            >
                                                Trang đầu
                                            </span>
                                        </li>
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === 1
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === 1 ? true : false}
                                                onClick={showFirstPage}
                                            >
                                                Lùi một trang
                                            </span>
                                        </li>
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === totalPages
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showNextPage}
                                            >
                                                Tiếp một trang
                                            </span>
                                        </li>
                                        <li className="page-item">
                                            <span
                                                className="page-link"
                                                style={
                                                    currentPage === totalPages
                                                        ? { opacity: '0.4' }
                                                        : { opacity: '1', cursor: 'pointer' }
                                                }
                                                disabled={currentPage === totalPages ? true : false}
                                                onClick={showLastPage}
                                            >
                                                Trang cuối
                                            </span>
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
