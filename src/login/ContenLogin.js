import React, { useRef, useState, useEffect } from 'react';
import GoogleAndFacebook from './GoogleAndFacebook';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './asset/css/content.css';
import './asset/css/login.css';
import AccountService from './../dashboard/services/AccountService';

export default class ContenLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    setParams = (event) => {
        this.setState({ [event.target.value]: event.target.value });
    };

    login = () => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        var urlencoded = new URLSearchParams();
        urlencoded.append('email', this.state.email);
        urlencoded.append('password', this.state.password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow',
        };
        fetch('http://localhost:8080/api/auth/login', requestOptions)
            .then((response) => {
                console.log(response);
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.status);
            })
            .then((result) => {
                console.log(result);
                localStorage.setItem('accessToken', result.accessToken);
                alert('Thành công');
            })
            .catch((error) => {
                console.log('error', error);
                alert('Email, passworrd không đúng!');
            });
    };

    // const [account, setAccount] = useState({
    //     loading: false,
    //     accounts: [],
    //     errorMessage: '',
    // });

    // const [submit, setSubmit] = useState({
    //     email: '',
    //     password: '',
    // });

    // useEffect(() => {
    //     try {
    //         async function postData() {
    //             let createAccount = await AccountService.addAccount(submit);
    //         }
    //         postData(submit);
    //         setAccount({ ...account, loading: false });
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [submit]);
    // const { loading, accounts, errorMessage } = account;

    // forgetPass = async (e) => {
    //     const { value: email } = await Swal.fire({
    //         title: 'Lấy Lại Mật Khẩu',
    //         input: 'email',
    //         inputLabel: 'Nhập địa chỉ email để lấy lại mật khẩu',
    //         inputPlaceholder: 'email@gmail.com',
    //     });

    //     if (email) {
    //         Swal.fire(`Mã xác nhận đã gửi đến địa chỉ email: ${email}`);
    //     }
    // };

    // const navigate = useNavigate();
    // const emailRef = useRef();

    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [errMess, setErrMess] = useState('');

    // useEffect(() => {
    //     emailRef.current.focus();
    // }, []);

    // const loginHandler = async (e) => {
    //     e.preventDefault();

    //     let user = new URLSearchParams({
    //         email: email,
    //         password: password,
    //     });

    // const saveCurrentUser = async (u) => {
    //     localStorage.setItem(
    //         'loginUser',
    //         JSON.stringify({
    //             username: u.username,
    //             fullName: u.fullName,
    //             password: u.password,
    //             phone: u.phone,
    //             email: u.email,
    //             avatar: u.avatar,
    //             locationRegion: u.locationRegion,
    // isAdmin: u.isAdmin, // thay = account / role
    //         }),
    //     );
    // };

    // AccountService.login(user)
    //     .then((response) => {
    //         if (response.status === 200) {
    //             Swal.fire({
    //                 position: 'top-center',
    //                 icon: 'success',
    //                 title: 'Đăng Nhập Thành Công!',
    //                 showConfirmButton: false,
    //                 timer: 1000,
    //             });
    //         } else {
    //             setErrMess(`*Sai email hoặc mật khẩu`);
    //             Swal.fire({
    //                 position: 'top-center',
    //                 icon: 'warning',
    //                 title: 'Đăng Nhập Thất bại',
    //                 showConfirmButton: false,
    //                 timer: 1000,
    //             });
    //         }
    //         return response.json();
    //     })
    //     .then((data) => {
    //         AccountService.getUser(data.data.id).then((res) => {
    // saveCurrentUser(res.data.data);
    // if (res.data.data.isAdmin) {
    //     // thay = account / role
    //     navigate('/');
    // } else {
    //     navigate('/product');
    // }

    //         setTimeout(window.location.reload(), 1000);
    //     });
    // })
    // .catch(function (err) {
    //     console.error('err: ' + err);
    // });
    // };
    render() {
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
                                                <form readOnly>
                                                    <div className="inputGroup">
                                                        <input
                                                            id="email"
                                                            placeholder="Email"
                                                            // ref={emailRef}
                                                            name="email"
                                                            type="email"
                                                            onChange={this.setParams}
                                                            // value={email}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="inputGroup">
                                                        <input
                                                            id="password"
                                                            placeholder="Mật Khẩu"
                                                            type="password"
                                                            onChange={this.setParams}
                                                            required
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
                                                    <button onClick={this.login} className="loginBtn" type="button">
                                                        Đăng Nhập
                                                    </button>
                                                    <br />
                                                    <br />
                                                    <GoogleAndFacebook />
                                                </form>
                                                <div className="loginFooter">
                                                    {/* <button className="forgetPass" onClick={forgetPass}>
                                                Quên Mật Khẩu?
                                            </button> */}
                                                    <button className="forgetPass">Quên Mật Khẩu?</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

// export default ContenLogin;
