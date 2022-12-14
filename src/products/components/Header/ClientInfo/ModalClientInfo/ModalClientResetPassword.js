import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AccountService from '../../../../../dashboard/services/AccountService';
import { getAccount } from '../../../../redux/selector';
import { useSelector } from 'react-redux';

let flag = false;
const ModalClientResetPassword = (props) => {
    const { showEditPassword, onCloseEditPasswordAccount } = props;
    const [submitFrm, setSubmitFrm] = useState({
        password: '',
    });
    const account_login = useSelector(getAccount);
    useEffect(() => {
        if (flag) {
            try {
                async function postData() {
                    await AccountService.editPasswordAccount(submitFrm);
                }
                postData();
                flag = false;
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);

    const formik = useFormik({
        initialValues: {
            id: 0,
            password: '',
            cpassword: '',
        },
        validationSchema: yup.object({
            password: yup
                .string()
                .min(8, 'Mật khẩu tối thiểu là 8 kí tự!')
                .max(20, 'Mật khẩu tối đa là 20 kí tự!')
                .required('Mật khẩu không được để trống!'),
            cpassword: yup
                .string()
                .oneOf([yup.ref('password')], 'Mật khẩu phải trùng nhau!')
                .required('Vui lòng nhập lại mật khẩu!'),
        }),
        onSubmit: (account) => {
            flag = true;
            setSubmitFrm({ ...submitFrm, id: account_login.id, password: account.password });
            handleReset();
            toast.success('Bạn đã cập nhật mật khẩu thành công!');
        },
    });
    const handleReset = () => {
        formik.handleReset();
        onCloseEditPasswordAccount();
    };
    return (
        <div>
            <Modal
                show={showEditPassword}
                onHide={onCloseEditPasswordAccount}
                backdrop="static"
                keyboard={false}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: 'black' }}>Cập nhật mật khẩu</Modal.Title>
                </Modal.Header>
                <form multiple="multiple" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                    <Modal.Body>
                        <div className="frmError"></div>
                        <div className="modal-body">
                            <div className="mb-2 col-12">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Mật khẩu mới:
                                    {formik.errors.password && formik.errors.password && (
                                        <li className="error">{formik.errors.password}</li>
                                    )}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Vui lòng nhập mật khẩu mới..."
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-12">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Nhập lại mật khẩu mới:
                                    {formik.errors.cpassword && formik.errors.cpassword && (
                                        <li className="error">{formik.errors.cpassword}</li>
                                    )}
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="cpassword"
                                    id="cpassword"
                                    placeholder="Xác nhận lại mật khẩu mới..."
                                    value={formik.values.cpassword}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="reset" className="btn btn-primary" onClick={onCloseEditPasswordAccount}>
                            Đóng
                        </Button>

                        <Button type="submit" className="btn btn-info">
                            Cập nhật
                        </Button>
                        <ToastContainer />
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    );
};

export default ModalClientResetPassword;
