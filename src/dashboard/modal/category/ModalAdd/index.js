import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import CategoryService from '../../../services/Category';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import '../../modal.css';
import 'react-toastify/dist/ReactToastify.css';


let flag = false;

function ModalAddCategory(props) {
    const notify = () =>
        toast.success('Đã thêm thành công!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const { show, handleClose } = props;
    const [category, setCategory] = useState({
        loading: false,
        categorys: [],
        errorMessage: '',
    });

    const [submitFrm, setSubmitFrm] = useState({
        slug: '',
        title: '',
    });

    // useEffect(() => {
    //     try {
    //         setCategory({ ...category, loading: true });
    //         async function getCate() {
    //             let category = await CategoryService.getCategory();
    //             setCategory({ ...categorys, categorys: category.data, loading: false });
    //         }
    //         getCate();
    //     } catch (error) {
    //         setCategory({ ...categorys, errorMessage: error.message, loading: false });
    //     }
    // }, []);
    useEffect(() => {
        if (flag) {
            try {
                async function postData(submitFrm) {
                    // setCategory({ ...category, loading: true });
                    let createRes = await CategoryService.addCategory(submitFrm);
                    console.log('createRes: ', createRes);
                }
                postData(submitFrm);

                notify();
                setCategory({ ...category, loading: false });
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);
    // Validate from add
    const handleReset = () => {
        formik.handleReset();
    };

    const formik = useFormik({
        initialValues: {
            slug: '',
            title: '',
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .min(5, 'tên sản phẩm nhỏ nhất là 5 kí tự!')
                .max(25, 'tên sản phẩm nhỏ nhất là 25 kí tự!')
                .required('Bạn phải nhập tên sản phẩm vào!'),
        }),
        onSubmit: (product) => {
            setSubmitFrm(product);
            handleReset();
        },
    });

    const { loading, categorys, errorMessage } = category;

    return (
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Add Category</Modal.Title>
            </Modal.Header>
            {loading ? (
                <span className="spinner-border text-warning"></span>
            ) : (
                <form multiple="multiple" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    {/* <form> */}
                    <Modal.Body>
                        <div className="frmError">
                            <ul>
                                {formik.errors.title && formik.touched.title && (
                                    <li className="error">{formik.errors.title}</li>
                                )}
                            </ul>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="mb-3">
                                    <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                        Tên sản phẩm
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        id="addTitle"
                                        placeholder="Vui lòng nhập tên sản phẩm..."
                                        value={formik.values.title}
                                        onChange={formik.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="reset" variant="secondary w-auto" className="" onClick={handleClose}>
                            Close
                        </Button>

                        <Button type="submit" className="btn btn-primary">
                            Create
                        </Button>

                        <ToastContainer />
                    </Modal.Footer>
                </form>
            )}
        </Modal>
    );
}

export default ModalAddCategory;
