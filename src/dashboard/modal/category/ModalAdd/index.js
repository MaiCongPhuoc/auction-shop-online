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
    useEffect(() => {
        try {
            async function postData() {
                let createRes = await CategoryService.addCategory(submitFrm);
            }
            postData(submitFrm);
            setCategory({ ...category, loading: false });
        } catch (error) {
            console.log(error);
        }
    }, [submitFrm]);
    const handleReset = () => {
        formik.handleReset();
        notify();
    };
    const formik = useFormik({
        initialValues: {
            slug: '',
            title: '',
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .min(5, 'Tên ngắn nhất là 5 kí tự!')
                .max(25, 'Tên dài nhất là 25 kí tự!')
                .required('Tên không được để trống!'),

            // .test(
            //     'title',
            //     'Tên đã tồn tại! Vui lòng nhập tên khác!',
            //     async (value) => (await fetch(`/validate-title/${value}`)).responseText === 'true',
            // ),

            // isEmail: Yup.boolean(),
            // email: Yup.string().when('isEmail', {
            //    is: true,
            //    then: Yup.string()
            //    .required('Enter Email ID'),
            //    otherwise: Yup.string(),
            // }),
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
