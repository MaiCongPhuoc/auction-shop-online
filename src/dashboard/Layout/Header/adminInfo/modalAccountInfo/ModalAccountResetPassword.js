import React from 'react';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAccount } from '../../../../../products/redux/selector';
import { useSelector } from 'react-redux';
import AccountService from './../../../../services/AccountService';

let flag = false;
const ModalAccountResetPassword = (props) => {
    const account = useSelector(getAccount);
    const notify = () =>
        toast.success('Đã sửa thành công!', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const { showEditPassword, onCloseEditPasswordAccount, accountEditPasswordId } = props;
    const [passwordReset, setPasswordReset] = useState({
        loading: false,
        passwords: {},
        errorMessage: '',
    });
    const { loading, passwords, errorMessage } = passwordReset;
    const [submitFrm, setSubmitFrm] = useState({
        password: '',
        cpassword: '',
        account: account,
    });
    useEffect(() => {
        if (flag) {
            try {
                async function postData() {
                    setPasswordReset({ ...passwordReset, loading: true });
                    await AccountService.editPasswordAccount(submitFrm, accountEditPasswordId);
                }

                postData();
                setPasswordReset({ ...passwordReset, loading: false });
            } catch (error) {
                console.log(error);
            }
        }
    }, [submitFrm]);

    useEffect(() => {
        try {
            if (accountEditPasswordId !== 0 || accountEditPasswordId !== undefined) {
                setPasswordReset({ ...passwordReset, loading: true });
                async function getAccountID() {
                    let apiPassword = await AccountService.getAccountById(accountEditPasswordId);
                    setPasswordReset({ ...passwordReset, passwords: apiPassword.data, loading: false });
                    console.log('category: ', apiPassword.data);
                }
                getAccountID();
            }
        } catch (error) {
            setPasswordReset({ ...passwordReset, errorMessage: error.message, loading: false });
        }
    }, [showEditPassword]);

    // const onClose = () => {
    //     formik.handleReset();
    //     hanldeCloseEditPasswordAccount();
    // };

    const formik = useFormik({
        initialValues: {
            password: passwords.password,
            cpassword: passwords.cpassword,
            account: account,
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
        onSubmit: (passwordReset) => {
            flag = true;
            setSubmitFrm(passwordReset);
            notify();
        },
    });
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
                <form multiple="multiple" onSubmit={formik.handleSubmit}>
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
                                    value={formik.values.password || passwords.password}
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
                                    value={formik.values.cpassword || passwords.cpassword}
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

export default ModalAccountResetPassword;
