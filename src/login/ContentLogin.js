import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './asset/css/content.css';
import './asset/css/login.css';
import { useDispatch } from 'react-redux';
import { loginStatus, setAccount } from '../products/redux/actions';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import AuthService from '../dashboard/services/AuthService';
import { useCookies } from 'react-cookie';
import useAuth from '../hooks/useAuth';
import AccountService from '../dashboard/services/AccountService';

let flag = false;
const ContentLogin = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [cookies, setCookie] = useCookies(['JWT', 'Username']);

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (flag) {
            try {
                async function login() {
                    let userLogin = await AuthService.postLogin(user);
                    let account = await AccountService.getAccountById(userLogin.data.id);
                    setUser(userLogin.data);
                    let u = userLogin.data;
                    let email = userLogin.data.name;
                    let username = userLogin.data.username;
                    let token = userLogin.data.token;
                    let roles = userLogin.data.roles;
                    dispatch(setAccount(account.data));
                    setCookie('JWT', userLogin.data.token, { path: '/' });

                    setAuth({ u, email, username, token, roles });
                    if (userLogin.data.roles[0].authority === 'USER') {
                        setTimeout(() => {
                            dispatch(loginStatus(true));
                            navigate('/product', { replace: true });
                        }, 2000);
                    } else {
                        setTimeout(() => {
                            dispatch(loginStatus(true));
                            navigate('/dashboard', { replace: true });
                        }, 2000);
                    }
                    toast.success(`????ng nh???p th??nh c??ng!`);
                }
                login();
                flag = false;
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
            email: yup.string().email('Vui l??ng nh???p ????ng ?????nh d???ng email!').required('Vui l??ng nh???p email!'),
            password: yup
                .string()
                .min(8, 'M???t kh???u t???i thi???u l?? 8 k?? t???!')
                .max(20, 'M???t kh???u t???i ??a l?? 20 k?? t???!')
                .required('Vui l??ng nh???p m???t kh???u!'),
        }),
        onSubmit: (account) => {
            flag = true;
            setUser(account);
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
                                        <h1>????ng nh???p t??i kho???n c???a b???n ????? tr???i nghi???m!</h1>
                                    </div>
                                    <br />
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
                                                placeholder="Nh???p email..."
                                                value={formik.values.email}
                                                onChange={formik.handleChange}
                                            />
                                        </div>
                                        <div className="inputGroup">
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                placeholder="Nh???p m???t kh???u..."
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
                                            ????ng Nh???p
                                        </button>
                                        {/* <br />
                                        <br />
                                        <GoogleAndFacebook />
                                        <div className="loginFooter">
                                            <Link to={'/restartPassword'} className="forgetPass">
                                                Qu??n M???t Kh???u?
                                            </Link>
                                        </div> */}
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
