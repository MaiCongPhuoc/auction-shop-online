import { useEffect, useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CategoryService from '../../../services/Category';
import '../../modal.css';

let flag = false;

function ModalEditCategory(props) {
    const { showEdit, categoryEditId, handleCloseEdit } = props;
    const [category, setCategory] = useState({
        loading: false,
        categorys: [],
        errorMessage: '',
    });
    const { loading, categorys, errorMessage } = category;
    const [submitFrm, setSubmitFrm] = useState({
        slug: '',
        title: '',
    });

    useEffect(() => {
        if (flag) {
            try {
                async function postData(submitFrm) {
                    setCategory({ ...category, loading: true });
                    await CategoryService.editCategory(submitFrm, categoryEditId);
                }
                postData(submitFrm);
                setCategory({ ...category, loading: false });
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);

    const formik = useFormik({
        initialValues: {
            slug: category.slug,
            title: category.title,
        },
        validationSchema: yup.object({
            title: yup
                .string()
                .min(5, 'tên sản phẩm nhỏ nhất là 5 kí tự!')
                .max(25, 'tên sản phẩm nhỏ nhất là 25 kí tự!')
                .required('Vui lòng đổi tên sản phẩm vào!'),
            slug: yup.string().required('Vui lòng sửa lại mô tả!'),
        }),
        onSubmit: (category) => {
            setSubmitFrm(category);
        },
        onReset: (category) => {
            console.log('onReset 2: ', category);
        },
    });

    return (
        <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false} size="lg">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Edit Category</Modal.Title>
            </Modal.Header>
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
                                    Title
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    id="addTitle"
                                    placeholder="Vui lòng nhập tên sản phẩm..."
                                    value={formik.values.title || category.title}
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
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalEditCategory;
