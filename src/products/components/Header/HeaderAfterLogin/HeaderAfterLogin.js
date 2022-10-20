
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Tippy from "@tippyjs/react";
import React from "react";
import { useSelector } from 'react-redux/es/exports';
import { getAccount, getAllCartItems } from "../../../redux/selector";

const HeaderAfterLogin = () => {

    const account = useSelector(getAccount);

    const cartItems = useSelector(getAllCartItems);

    const renderAccuont = () => {
        return (
            <div
                className="dropdown-menu-right shadow animated--grow-in accountAdmin"
                aria-labelledby="userDropdown"
            >
                <a className="tippy-account p-2" href="#">
                    <FontAwesomeIcon icon={faPlus} className="pr-2" />
                    Add product
                </a>
                {/* <a className="dropdown-item p-2" href="#">
                    <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                    Settings
                </a>
                <a className="dropdown-item p-2" href="#">
                    <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                    Activity Log
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item p-2" href="#" data-toggle="modal" data-target="#logoutModal">
                    <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                    Logout
                </a> */}
            </div>
        );
    };

    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
                <div>
                    <i style={{ position: 'relative' }} className="fa-brands fa-opencart fa-2x ic-cart me-3" aria-hidden="true">
                        <span
                            style={{
                                textAlign: 'center',
                                position: 'absolute',
                                border: '0.5px solid white',
                                width: 'auto',
                                height: '20px',
                                borderRadius: '10px',
                                backgroundColor: 'red',
                                color: 'white',
                                fontSize: '12px',
                                left: '40px',
                                bottom: '26px',
                                padding: '3px'
                            }}
                        >
                            {cartItems.length}
                        </span>
                    </i>
                </div>
                <div className="widget-notif-wrapper">
                    <div>

                        <div className="ic-notif-num">
                            <i style={{ position: 'relative' }} className="fa-regular fa-bell fa-2x ic-notif " aria-hidden="true" >
                                <span
                                    style={{
                                        textAlign: 'center',
                                        position: 'absolute',
                                        border: '0.5px solid white',
                                        width: 'auto',
                                        height: '20px',
                                        borderRadius: '10px',
                                        backgroundColor: 'red',
                                        color: 'white',
                                        fontSize: '12px',
                                        left: '15px',
                                        bottom: '15px',
                                        padding: '3px'
                                    }}
                                >
                                    1
                                </span>
                            </i>
                        </div>
                        <div className="widget-posts-fb-wrapper hidden">
                            <div className="post-fb-inner-wrapper">
                                <div className="content-wrapper">
                                    <div className="widget-tabs">
                                        <div className="w11 w-tab show active">Updates</div>
                                        <div className="w11 w-tab">Feedback</div>
                                        <div className="w11 w-tab">Messages</div>
                                    </div><div className="widget-posts-wrapper">
                                        <div className="post-item list-view ">
                                            <div className="post-header">
                                                <div className="post-label">
                                                    <i className="fal fa-comment-alt-smile" aria-hidden="true" style={{ color: 'rgb(43, 156, 214)' }} />Welcome</div>
                                                <div className="post-time read">2 years ago</div>
                                            </div>
                                            <div>
                                                <span className="post-title">Welcome to Charitybuzz! - </span>
                                                <span className="post-description">Check out these tips to enhance your bidding experience</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="widget-footer shown">
                                    <a href="/posts">View All Updates</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <a className="logged_in_name mx-3" href="#">{account.username}</a> */}
                <Tippy
                    // delay={[0, 700]}
                    // offset={[15, 8]}
                    placement="bottom-end"
                    interactive
                    content={renderAccuont()}
                    hideOnClick={true}
                    trigger="click"
                >
                    <a className="logged_in_name mx-3" href="#">{account.username}</a>
                </Tippy>
                <a id="customer-logout-link" className="new-login-button" rel="nofollow" href="/logout">LOG OUT</a>
            </div>
        </div>
    )
}

export default HeaderAfterLogin;