import React from 'react';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactDOM from 'react-dom/client';
import { useEffect, useState } from 'react';
import ProductService from '../../../services/ProductService';
import Moment from 'moment';
import { NumericFormat } from 'react-number-format';
import Spiner from '../../../Spiner';
import ModalDetailProduct from '../../../modal/product/ModalDetail';
import { Button, Modal } from 'react-bootstrap';
import ModalAddProduct from '../../../modal/product/ModalAdd';
import ModalEditProduct from '../../../modal/product/ModalEdit';
import Swal from 'sweetalert2';
import DefaultProduct from '../../../Spiner/defaultProduct';
<<<<<<< HEAD
import AlertWarning from '../../../Sweet/SweetWarning';
import '../../pages.css';

=======
import Pagination from '@mui/material/Pagination';
>>>>>>> development
function BangSanPham() {
    Moment.locale('vi');
    let tongtien = 0;
    const [state, setState] = useState({
        loading: false,
        products: [],
        errorMessage: '',
    });
    const [reRender, setReRender] = useState(false);

    // modal detail
    const [showDetail, setShowDetail] = useState({
        product: {},
        showdetail: false,
    });

    const { product, showdetail } = showDetail;

    const handleCloseDetail = () => setShowDetail({ ...showDetail, showdetail: false });

    //modal add
    const [showAdd, setShowAdd] = useState(false);
    const handCloseAdd = () => setShowAdd(false);

    //modal edit
    const [showEdit, setShowEdit] = useState({
        productEditId: 0,
        showedit: false,
    });
    const { productEditId, showedit } = showEdit;
    const handleCloseEdit = () => setShowEdit(false);
    function handleClick(id) {
        Swal.fire({
            title: 'Are you sure?',
            type: 'warning',
            text: "You won't be able to revert this!",
            footer: '',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
            // onOpen: () => {
            //     console.log('chi day');
            // },
        }).then((result) => {
            async function deleteProduct(id) {
                await ProductService.DeleteProduct(id);
                setReRender(!reRender);
            }
            deleteProduct(id);
            if (result.value) {
                console.log('result.value');
                Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            }
        });
    }

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
    }, [showAdd, showEdit, reRender]);

    // const WarningData = {
    //     title: 'Are you sure?',
    //     type: 'warning',
    //     text: "You won't be able to revert this!",
    //     footer: '',
    // };

    const { loading, products, errorMessage } = state;

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
                <div className="shadow mb-4 cur-div">
                    <div className="card-header py-3 d-flex justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Danh sách sản phẩm</h6>
                        <div>
                            {/* Button trigger modal */}
                            <Button type="button" className="btn btn-primary" onClick={() => setShowAdd(true)}>
                                Add
                            </Button>
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
                                                                productId: product.id,
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
                                                <td><strong>{product.title}</strong></td>
                                                <td className="text-center">{product.createdBy}</td>
                                                <td className="text-end">
                                                    {Moment(product.createdAt).format('DD-MM-yyyy hh:mm:ss')}
                                                </td>
                                                <td>{product.category.title}</td>
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
                                                        Edit
                                                    </button>
                                                    {/* <button className="btn btn-outline-danger ml-2">Remove</button> */}
                                                    <button
                                                        className="btn btn-outline-danger ml-2"
                                                        onClick={() => handleClick(product.id)}
                                                    >
                                                        Remove
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
                        </div>
                    </div>
                </div>
            )}
            {/* ================== Modal Edit ================== */}
            <ModalEditProduct productEditId={productEditId} showEdit={showedit} handleCloseEdit={handleCloseEdit} />

            {/* =================== Modal detail products ===================== */}
            <ModalDetailProduct product={product} showdetail={showdetail} handleCloseDetail={handleCloseDetail} />

            {/*==================== Modal Add ===========================*/}
            <ModalAddProduct show={showAdd} handleClose={handCloseAdd} />
        </div>
    );
}

export default BangSanPham;
