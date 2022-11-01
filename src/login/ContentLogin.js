import React, { useRef, useState, useEffect } from 'react';
import GoogleAndFacebook from './GoogleAndFacebook';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import './asset/css/content.css';
import './asset/css/login.css';
import AccountService from '../dashboard/services/AccountService';
import axios from 'axios';
// import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { loginStatus, setAccount } from '../products/redux/actions';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import AuthService from '../dashboard/services/AuthService';
import { useCookies } from 'react-cookie';
import { stringify } from 'rc-field-form/es/useWatch';

let flag = false;
const ContentLogin = () => {
    const [cookies, setCookie] = useCookies(['JWT', 'Username']);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (flag) {
            try {
                async function login() {
                    let userLogin = await AuthService.postLogin(user);
                    setUser(userLogin.data);
                    console.log('userLogin.data: ', userLogin.data);
                    console.log('userLogin.data.token: ', userLogin.data.token);
                    let d = new Date();
                    d.setTime(d.getTime() + 2 * 60 * 1000);

                    setCookie('JWT', userLogin.data.token, { path: '/' });
                    dispatch(loginStatus(true));
                    dispatch(setAccount(userLogin.data));
                    toast.success(`Đăng nhập thành công!`);
                    if (userLogin.data.roles[0].authority === 'USER') {
                        navigate('/', { replace: true });
                    } else {
                        navigate('/dashboard', { replace: true });
                    }
                }
                login();
                flag = false;
                console.log('user: ', user);
            } catch (error) {}
        }
    }, [user]);

    const handleReset = () => {
        formik.handleReset();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email().required('Vui lòng nhập tên sản phẩm vào!'),
            password: yup
                .string()
                .min(8, 'Mật Khẩu ít nhất là 8 kí tự!')
                .max(20, 'Mật khẩu tối đa là 20 kí tự!')
                .required('Vui lòng nhập mật khẩu!'),
        }),
        onSubmit: (account) => {
            flag = true;
            setUser(account);
            console.log('add count: ', account);
            handleReset();
        },
    });
    return (
        <div className="base-width main-yield">
            <div className="login" data-pages-shell>
                <div data-react-class="onboarder/OnBoarderRouter" data-react-props>
                    <div className="OnBoarder-module__wrapper___3_Izy onboarder">
                        <div className="col-12">
                            <div id="loginWrapper">
                                <div id="loginForm">
                                    <div className="loginNav">
                                        <h1>Đăng nhập tài khoản của bạn để trải nghiệm!</h1>
                                    </div>

                                    {/* <form onSubmit={loginHandler} readOnly> */}
                                    <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                                        <div className="frmError">
                                            <ul>
                                                {formik.errors.email && formik.errors.email && (
                                                    <li className="error">{formik.errors.email}</li>
                                                )}
                                                {formik.errors.password && formik.errors.password && (
                                                    <li className="error">{formik.errors.password}</li>
                                                )}
                                            </ul>
                                        </div>
                                        <div className="inputGroup">
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                placeholder="Nhập email..."
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="inputGroup">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Nhập mật khẩu..."
                                                value={formik.values.password}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        {/* <div className="row col-12">
                                                <div className="google col-6">
                                                    <Google />
                                                </div>
                                                <div className="col-6">
                                                    <Facebook />
                                                </div>
                                            </div> */}
                                        <button type="submit" className="loginBtn">
                                            Đăng Nhập
                                        </button>
                                        <br />
                                        <br />
                                        <GoogleAndFacebook />
                                        <div className="loginFooter">
                                            {/* <button className="forgetPass" onClick={forgetPass}>
                                                Quên Mật Khẩu?
                                            </button> */}
                                            <button className="forgetPass">Quên Mật Khẩu?</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer autoClose={1500} />
        </div>
    );
};

export default ContentLogin;
