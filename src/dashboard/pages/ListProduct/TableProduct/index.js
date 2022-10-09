import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import ProductService from '../../../services/productService';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';
import Spiner from '../../../Spiner';
import ModalDetailProduct from '../../../modal/product/ModalDetailProduct';

function BangSanPham() {
    Moment.locale('en');
    let tongtien = 0;
    const [state, setState] = useState({
        loading: false,
        products: [],
        errorMessage: '',
    });

    useEffect(() => {
        try {
            setState({ ...state, loading: true });
            async function getData() {
                let productRes = await ProductService.getProducts();
                setState({
                    ...state,
                    products: productRes.data,
                    loading: false,
                });
            }
            getData();
        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.message,
            });
        }
    }, []);

    const { loading, products, errorMessage } = state;
    console.log(products);
    
    const handleDetailProduct = () => {
        ModalDetailProduct('alo' , '#btnModalDetailProduct');
    };
    
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between">
                <h1 className="h3 mb-2 text-gray-800">Danh sách sản phẩm</h1>
                <form className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control bg-light small"
                            placeholder="Tìm kiếm sản phẩm..."
                            aria-label="Search"
                            aria-describedby="basic-addon2"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="button">
                                <i className="fas fa-search fa-sm" />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {loading ? (
                <Spiner />
            ) : (
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                        <div>
                            {/* Button trigger modal */}
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#btnAdd"
                            >
                                Add
                            </button>
                            {/*==================== Modal Add ===========================*/}
                            <div
                                className="modal fade"
                                id="btnAdd"
                                data-bs-backdrop="static"
                                data-bs-keyboard="false"
                                tabIndex={-1}
                                aria-labelledby="staticBackdropLabel"
                                aria-hidden="true"
                            >
                                <div className="modal-dialog-centered modal-dialog modal-xl">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                                Thêm sản phẩm
                                            </h1>
                                            <button
                                                type="button"
                                                className="btn btn-light"
                                                data-bs-dismiss="modal"
                                                aria-label="Close"
                                            >
                                                <FontAwesomeIcon icon={faClose} />
                                            </button>
                                        </div>
                                        <form>
                                            <div className="modal-body">
                                                <div className="row">
                                                    <div className="mb-3 col-6">
                                                        <label
                                                            htmlFor="addTitle"
                                                            className="form-label text-dark font-weight-bold ml-2"
                                                        >
                                                            Tên sản phẩm
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="addTitle"
                                                            placeholder="Tên sản phẩm..."
                                                        />
                                                    </div>
                                                    <div className="mb-3 col-6">
                                                        <label
                                                            htmlFor="addPrice"
                                                            className="form-label text-dark font-weight-bold ml-2"
                                                        >
                                                            Giá
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="addPrice"
                                                            placeholder="Giá..."
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-3 col-4">
                                                        <label
                                                            htmlFor="addAvailable"
                                                            className="form-label text-dark font-weight-bold ml-2"
                                                        >
                                                            Số Lượng
                                                        </label>
                                                        <input
                                                            type="number"
                                                            className="form-control"
                                                            id="addAvailable"
                                                            placeholder="Số lượng..."
                                                        />
                                                    </div>
                                                    <div className="form-check form-switch mb-3 col-4">
                                                        <label
                                                            htmlFor="addAction"
                                                            className="form-label text-dark font-weight-bold ml-2"
                                                        >
                                                            Bày bán/Đấu giá
                                                        </label>
                                                        <div className="ml-5">
                                                            <input
                                                                className="form-check-input form-control mt-2 p-2"
                                                                type="checkbox"
                                                                id="addAction"
                                                                // defaultChecked
                                                            />
                                                            <label
                                                                className="form-check-label form-label mt-1"
                                                                htmlFor="addAction"
                                                            >
                                                                Bày bán/Đấu giá
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div className="mb-3 col-4">
                                                        <label
                                                            htmlFor="addCateglory"
                                                            className="form-label text-dark font-weight-bold ml-2"
                                                        >
                                                            Thể loại
                                                        </label>
                                                        <select className="form-select">
                                                            <option value={-1} key={-1} selected disabled>
                                                                Chọn
                                                            </option>
                                                            <option value="2" key="2">
                                                                Điện thoại
                                                            </option>
                                                            <option value="3" key="3">
                                                                Máy tính bảng
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="mb-3 col-12">
                                                        <label
                                                            htmlFor="addImage"
                                                            className="form-label text-dark font-weight-bold ml-2"
                                                        >
                                                            Images
                                                        </label>
                                                        <input
                                                            type="file"
                                                            className="form-control"
                                                            accept="image/*"
                                                            id="addImage"
                                                            placeholder="Vui lòng chọn file..."
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
                                                    data-bs-dismiss="modal"
                                                >
                                                    Close
                                                </button>
                                                <button type="button" className="btn btn-primary">
                                                    Create
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
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
                                        <th>Ngày tạo</th>
                                        <th>Thể loại</th>
                                        <th>Bán/đấu giá</th>
                                        <th>Số lượng</th>
                                        <th>Giá ($)</th>
                                        <th className="text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => {
                                        tongtien += product.available * product.price;
                                        return (
                                            <tr key={product.id}>
                                                <td>
                                                    <img
                                                        src={product.image}
                                                        alt="ảnh sản phẩm"
                                                        style={{ width: '100px' }}
                                                    />
                                                </td>
                                                <td>
                                                    <button
                                                        onClick={handleDetailProduct}
                                                        className="btnDetailProduct"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#btnModalDetailProduct"
                                                    >
                                                        {product.title}
                                                    </button>
                                                </td>
                                                <td className="text-center">{product.createdBy}</td>
                                                <td className="text-end">
                                                    {Moment(product.createdAt).format('DD-MM-yyyy hh:mm:ss')}
                                                </td>
                                                <td>{product.category.title}</td>
                                                <td>{product.action ? 'Bán' : 'Đấu giá'}</td>
                                                <td className="text-end">{product.available}</td>
                                                <td className="text-end">{product.price}</td>
                                                <td className="text-center">
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        data-bs-toggle="modal"
                                                        data-bs-target="#btnEdit"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button className="btn btn-outline-danger ml-2">Remove</button>
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
                                                suffix={'$'}
                                            />
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            )}
            {/* ================== Modal Edit ================== */}
            <div
                className="modal fade"
                id="btnEdit"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog-centered modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">
                                Thêm sản phẩm
                            </h1>
                            <button type="button" className="btn btn-light" data-bs-dismiss="modal" aria-label="Close">
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                        <form>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="mb-3 col-6">
                                        <label
                                            htmlFor="addTitle"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Tên sản phẩm
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="addTitle"
                                            placeholder="Tên sản phẩm..."
                                        />
                                    </div>
                                    <div className="mb-3 col-6">
                                        <label
                                            htmlFor="addPrice"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Giá
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="addPrice"
                                            placeholder="Giá..."
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-4">
                                        <label
                                            htmlFor="addAvailable"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Số Lượng
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="addAvailable"
                                            placeholder="Số lượng..."
                                        />
                                    </div>
                                    <div className="form-check form-switch mb-3 col-4">
                                        <label
                                            htmlFor="addAction"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Bày bán/Đấu giá
                                        </label>
                                        <div className="ml-5">
                                            <input
                                                className="form-check-input form-control mt-2 p-2"
                                                type="checkbox"
                                                id="addAction"
                                                // defaultChecked
                                            />
                                            <label className="form-check-label form-label mt-1" htmlFor="addAction">
                                                Bày bán/Đấu giá
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mb-3 col-4">
                                        <label
                                            htmlFor="addCateglory"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Thể loại
                                        </label>
                                        <select className="form-select">
                                            <option value={-1} key={-1} selected disabled>
                                                Chọn
                                            </option>
                                            <option value="2" key="2">
                                                Điện thoại
                                            </option>
                                            <option value="3" key="3">
                                                Máy tính bảng
                                            </option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="mb-3 col-12">
                                        <label
                                            htmlFor="addImage"
                                            className="form-label text-dark font-weight-bold ml-2"
                                        >
                                            Images
                                        </label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            id="addImage"
                                            placeholder="Vui lòng chọn file..."
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* =================== Modal detail products ===================== */}
            {/* <ModalDetailProduct /> */}
        </div>
    );
}

export default BangSanPham;
