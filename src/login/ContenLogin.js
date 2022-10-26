import React from 'react';
import './asset/css/content.css';
import './asset/css/login.css';
import Google from './Google';
import Facebook from './Facebook';
import GoogleAndFacebook from './GoogleAndFacebook';

const ContenLogin = () => {
    return (
        <>
            <div className="base-width main-yield" id="client-content">
                <div className="pages" data-pages-shell>
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
                                                    placeholder="Nhập email"
                                                    // ref={emailRef}
                                                    type="email"
                                                    // onChange={(e) => {
                                                    //     setEmail(e.target.value);
                                                    // }}
                                                    // value={email}
                                                    required
                                                />
                                            </div>

                                            <div className="inputGroup">
                                                <input
                                                    id="password"
                                                    placeholder="Mật Khẩu"
                                                    type="password"
                                                    // onChange={(e) => {
                                                    //     setPassword(e.target.value);
                                                    // }}
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
                                            <GoogleAndFacebook />
                                            <button className="loginBtn">Đăng Nhập</button>
                                        </form>
                                        <div className="loginFooter">
                                            {/* <button className="forgetPass" onClick={forgetPass}> */}
                                            <button className="forgetPass">Quên Mật Khẩu?</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ContenLogin;
