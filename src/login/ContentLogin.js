import React, { useRef, useState, useEffect } from 'react';
import GoogleAndFacebook from './GoogleAndFacebook';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './asset/css/content.css';
import './asset/css/login.css';
import AccountService from '../dashboard/services/AccountService';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginStatus, setAccount } from '../products/redux/actions';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

const ContentLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [user, setUserDetails] = useState({
        email: '',
        password: '',
    });
    const [userstate, setUserState] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...user,
            [name]: value,
        });
    };
    const validateForm = (values) => {
        const error = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.email) {
            error.email = 'Email is required';
        } else if (!regex.test(values.email)) {
            error.email = 'Please enter a valid email address';
        }
        if (!values.password) {
            error.password = 'Password is required';
        }
        return error;
    };
    const loginHandler = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(user));
        setIsSubmit(true);
    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            axios
                .post('http://localhost:8080/api/auth/login', user)
                .then((res) => {
                    axios.get('http://localhost:8080/api/accounts/getAccountEmail/' + res.data.name).then((res) => {
                        if (res.data.role.id === 2) {
                            dispatch(loginStatus(true));
                            setUserState(res.data.user);
                            dispatch(setAccount(res.data));
                            toast.success(`Đăng nhập thành công!`);
                            setTimeout(() => {
                                navigate('/product', { replace: true });
                            }, 2000);
                        }
                        if (res.data.role.id === 1) {
                            setUserState(res.data.user);
                            dispatch(loginStatus(true));
                            dispatch(setAccount(res.data));
                            toast.success(`Đăng nhập thành công!`);
                            setTimeout(() => {
                                navigate('/dashboard', { replace: true });
                            }, 2000);
                        }
                    });
                })
                .catch((res) => {
                    dispatch(loginStatus(false));
                    toast.warning(res.response.data.exceptionMessage);
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 2000);
                });
        }
    }, [formErrors]);
    return (
        <div>
            <form>
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
                                            {/* <span className="d-block mt-3 text-danger fw-bold">{errMess}</span> */}
                                            <span className="d-block mt-3 text-danger fw-bold"></span>

                                            {/* <form onSubmit={loginHandler} readOnly> */}
                                            <form>
                                                <div className="inputGroup">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        placeholder="Email"
                                                        onChange={changeHandler}
                                                        value={user.email}
                                                    />
                                                    <p>{formErrors.email}</p>
                                                </div>

                                                <div className="inputGroup">
                                                    <input
                                                        type="password"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        onChange={changeHandler}
                                                        value={user.password}
                                                    />
                                                    <p>{formErrors.password}</p>
                                                </div>
                                                {/* <div className="row col-12">
                                                <div className="google col-6">
                                                    <Google />
                                                </div>
                                                <div className="col-6">
                                                    <Facebook />
                                                </div>
                                            </div> */}
                                                <button className="loginBtn" onClick={loginHandler}>
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
                </div>
            </form>
            <ToastContainer autoClose={1500} />
        </div>
    );
};

export default ContentLogin;
