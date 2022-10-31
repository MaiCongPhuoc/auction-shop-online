import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CategoryService from '../../../services/Category';
import '../../modal.css';
import { toast, ToastContainer } from 'react-toastify';

let flag = false;

function ModalEditCategory(props) {
    const notify1 = () =>
        toast.success('Đã sửa thành công!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const { showedit, categoryEditId, handleCloseEdit } = props;
    console.log('props: ', props);
    const [category, setCategory] = useState({
        loading: false,
        categorys: {},
        errorMessage: '',
    });
    const { loading, categorys, errorMessage } = category;
    const [submitFrm, setSubmitFrm] = useState({
        title: '',
        slug: '',
    });

    useEffect(() => {
        if (flag) {
            try {
                async function postData() {
                    setCategory({ ...category, loading: true });
                    await CategoryService.editCategory(submitFrm, categoryEditId);
                }

                postData();
                setCategory({ ...category, loading: false });
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);

    useEffect(() => {
        try {
            if (categoryEditId !== 0 || categoryEditId !== undefined) {
                setCategory({ ...category, loading: true });
                async function getCate() {
                    let apicategory = await CategoryService.getCategoryById(categoryEditId);
                    setCategory({ ...category, categorys: apicategory.data, loading: false });
                    console.log('category: ', apicategory.data);
                }
                getCate();
            }
        } catch (error) {
            setCategory({ ...category, errorMessage: error.message, loading: false });
        }
    }, [showedit]);

    const handleCloseEditProduct = () => {
        formik.handleReset();
        handleCloseEdit();
    };

    const formik = useFormik({
        initialValues: {
            title: categorys.title,
            slug: categorys.slug,
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
        }),
        onSubmit: (category) => {
            flag = true;
            setSubmitFrm(category);
            // handleReset();
            notify1();
        },
    });

    return (
        <Modal show={showedit} onHide={handleCloseEditProduct} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Edit Category</Modal.Title>
            </Modal.Header>
            <form multiple="multiple" onSubmit={formik.handleSubmit}>
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
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="addTitle"
                                    placeholder="Vui lòng nhập tên sản phẩm..."
                                    value={formik.values.title || categorys.title}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="reset" variant="secondary w-auto" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button type="submit" className="btn btn-primary">
                        Save
                    </Button>
                    <ToastContainer />
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalEditCategory;
