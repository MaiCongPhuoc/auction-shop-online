import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import ProductService from '../../../services/productService';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';
import Spiner from '../../../Spiner';
import ModalDetailProduct from '../../../modal/product/ModalDetail';
import { Button, Modal } from 'react-bootstrap';
import ModalAddProduct from '../../../modal/product/ModalAdd';
import ModalEditProduct from '../../../modal/product/ModalEdit';
import Swal from 'sweetalert2';
import DefaultProduct from '../../../Spiner/defaultProduct';
import '../../pages.css';
import Pagination from '@mui/material/Pagination';
import ProductsComponent from './ProductsComponent';
import CategoryService from '../../../services/Category';

function BangSanPham() {
    Moment.locale('vi');
    let tongtien = 0;
    const [state, setState] = useState({
        loading: false,
        products: [],
        currentPage: 1,
        recordPerPage: 5,
        search: '',
        errorMessage: '',
        totalPages: 0,
        categories: [],
    });

    const [reRender, setReRender] = useState(false);

    // modal detail
    const [showDetail, setShowDetail] = useState({
        product: {},
        showdetail: false,
        productIdDetail: 0,
    });

    const { product, showdetail, productIdDetail } = showDetail;

    const handleCloseDetail = () => setShowDetail({ ...showDetail, showdetail: false });

    //modal add
    const [showAdd, setShowAdd] = useState(false);
    // const handCloseAdd = () => setShowAdd(false);

    //modal edit
    const [showEdit, setShowEdit] = useState({
        productEditId: 0,
        showedit: false,
    });
    const { productEditId, showedit } = showEdit;
    const handleCloseEdit = () => setShowEdit(false);

    // function handleClick(id) {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         type: 'warning',
    //         text: "You won't be able to revert this!",
    //         footer: '',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!',
    //     }).then((result) => {
    //         if (result.value) {
    //             async function deleteProduct(id) {
    //                 await ProductService.DeleteProduct(id);
    //                 setReRender(!reRender);
    //             }
    //             deleteProduct(id);
    //             console.log('result.value');
    //             Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
    //         }
    //     });
    // }

    const notify = (id) =>
        Swal.fire({
            title: 'Bạn chắc không?',
            text: 'Bạn sẽ không hoàn tác lại!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Vâng! Tôi xóa nó',
        }).then((result) => {
            if (result.isConfirmed) {
                async function deleteProduct(id) {
                    await ProductService.DeleteProduct(id);
                    setReRender(!reRender);
                }
                deleteProduct(id);
                Swal.fire('Đã kiểm!', 'Bạn đã xóa sản phẩm này.', 'Thành cống');
            }
        });

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let category = await CategoryService.getCategory();
                // console.log('category.data useEffect: ', category.data);
                setState({
                    ...state,
                    categories: category.data,
                    loading: false,
                });
            }
            getData();
            getProductsByPagination(state.currentPage);
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message,
            });
        }
    }, [showAdd, showEdit, reRender]);

    // const WarningData = {
    //     title: 'Are you sure?',
    //     type: 'warning',
    //     text: "You won't be able to revert this!",
    //     footer: '',
    // };

    // const [dataTable, setDataTable] = useState({
    //     products: [],
    //     currentPage: 1,
    //     recordPerPage: 5,
    //     search: '',
    // });
    // const { productsData, currentPage, recordPerPage, search } = dataTable;

    // data table
    async function getProductsByPagination(currentPage) {
        state.currentPage = currentPage - 1;
        let productData = await ProductService.getDataTableProduct(
            state.search,
            state.currentPage,
            state.recordPerPage,
        );
        let category = await CategoryService.getCategory();
        // console.log('productData.data: ', productData.data);
        setState({
            ...state,
            products: productData.data.content,
            totalPages: productData.data.totalPages,
            totalElements: productData.data.totalElements,
            currentPage: productData.data.number + 1,
            categories: category.data,
            loading: false,
        });
    }

    const showNextPage = () => {
        let current = state.currentPage;
        let total = state.totalElements;
        let record = state.recordPerPage;
        if (current < Math.ceil(total / record)) {
            if (state.search !== '') {
                getProductsByPagination(current + 1);
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
                getProductsByPagination(Math.ceil(total / record));
            } else {
                searchBook(Math.ceil(total / record));
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
            //assigning value to event target
            [e.target.name]: e.target.value,
        });
    };

    const searchBook = (currentPage) => {
        if (document.querySelector('#search').value === '') {
            document.querySelector('#select').value = '-1';
        }
        currentPage = currentPage - 1;
        async function getDataTable() {
            let dataTable = await ProductService.getDataTableProduct(state.search, currentPage, state.recordPerPage);
            setState({
                ...state,
                products: dataTable.data.content,
                totalPages: dataTable.data.totalPages,
                totalElements: dataTable.data.totalElements,
                currentPage: dataTable.data.number + 1,
            });
            // console.log('state: ', state);
        }
        getDataTable();
    };

    const resetBook = (currentPage) => {
        setState({ ...state, search: '' });
        getProductsByPagination(state.currentPage);
    };

    console.log('state new: ', state);
    const { loading, products, currentPage, recordPerPage, search, errorMessage, totalPages, categories } = state;

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between">
                <h1 className="h3 mb-2 text-gray-800">Danh sách sản phẩm</h1>
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
                            <button className="btn btn-primary" type="button" name="search" onClick={searchBook}>
                                <i className="fas fa-search fa-sm" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="shadow mb-4 cur-div">
                    <div className="card-header py-3 d-flex justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                        <div className="d-flex align-items-center w-50">
                            <p className="w-100 mb-0">Lọc theo thể loại:</p>
                            <select
                                className="form-select mr-3 select-bg-ori"
                                id="select"
                                name="search"
                                onChange={searchBox}
                            >
                                <option value={-1} key={-1} disabled selected>
                                    Chọn
                                </option>
                                {categories.map((category) => (
                                    <option value={category.title} key={category.id}>
                                        {category.title}
                                    </option>
                                ))}
                            </select>
                            {/* Button trigger modal */}
                            {/* <Button type="button" className="btn btn-primary" onClick={() => setShowAdd(true)}>
                                Thêm
                            </Button> */}
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-hover" id="dataTable" width="100%" cellSpacing={0}>
                                <thead>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Tên SP</th>
                                        <th>Người tạo</th>
                                        <th className="text-center">Ngày tạo</th>
                                        <th>Thể loại</th>
                                        <th>Bán/đấu giá</th>
                                        <th>Số lượng</th>
                                        <th>Giá (đ)</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        tongtien += product.available * product.price;
                                        return (
                                            <tr key={product.id}>
                                                <td>
                                                    <button
                                                        onClick={() =>
                                                            setShowDetail({
                                                                product: product,
                                                                showdetail: true,
                                                                productIdDetail: product.id,
                                                            })
                                                        }
                                                        className="btnDetailProduct"
                                                    >
                                                        <img
                                                            src={
                                                                product.image ||
                                                                'https://phutungnhapkhauchinhhang.com/wp-content/uploads/2020/06/default-thumbnail.jpg'
                                                            }
                                                            alt="ảnh sản phẩm"
                                                            style={{ width: '100px' }}
                                                        />
                                                    </button>
                                                </td>
                                                <td>
                                                    <strong>{product.title}</strong>
                                                </td>
                                                <td className="text-center">{product.createdBy}</td>
                                                <td className="text-end">
                                                    {Moment(product.createdAt).format('DD-MM-yyyy hh:mm:ss')}
                                                </td>
                                                <td>
                                                    {product.category.deleted === true ? null : product.category.title}
                                                </td>
                                                <td>{product.action ? 'Đấu giá' : 'Bán'}</td>
                                                <td className="text-end">{product.available}</td>
                                                <td className="text-end">
                                                    <NumericFormat
                                                        value={product.price}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        suffix={' đ'}
                                                    />
                                                </td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() =>
                                                            setShowEdit({
                                                                ...showEdit,
                                                                productEditId: product.id,
                                                                showedit: true,
                                                            })
                                                        }
                                                    >
                                                        Sửa đổi
                                                    </button>
                                                    {/* <button className="btn btn-outline-danger ml-2">Remove</button> */}
                                                    <button
                                                        className="btn btn-outline-danger ml-2"
                                                        onClick={() => notify(product.id)}
                                                    >
                                                        Xóa
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>Ảnh</th>
                                        <th>Tên SP</th>
                                        <th>Người tạo</th>
                                        <th>Ngày tạo</th>
                                        <th>Thể loại</th>
                                        <th>Bán/đấu giá</th>
                                        <th>Số lượng</th>
                                        <th className="text-start">Tổng: </th>
                                        <th className="text-end pr-4">
                                            <NumericFormat
                                                value={tongtien}
                                                displayType={'text'}
                                                thousandSeparator={true}
                                                suffix={' đ'}
                                            />
                                        </th>
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
                    {/* <ProductsComponent /> */}
                </div>
            )}
            {/* ================== Modal Edit ================== */}
            <ModalEditProduct productEditId={productEditId} showEdit={showedit} handleCloseEdit={handleCloseEdit} />

            {/* =================== Modal detail products ===================== */}
            <ModalDetailProduct
                product={product}
                showdetail={showdetail}
                productIdDetail={productIdDetail}
                handleCloseDetail={handleCloseDetail}
            />

            {/*==================== Modal Add ===========================*/}
            {/* <ModalAddProduct show={showAdd} handleClose={handCloseAdd} /> */}
        </div>
    );
}

export default BangSanPham;
