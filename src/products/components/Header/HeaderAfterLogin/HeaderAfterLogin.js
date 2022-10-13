
import React from "react";

const HeaderAfterLogin = () => {
    return (
        <div className="main-login-div small-4">
            <div className="login-button-container">
                <div className="">
                    <i className="fa-brands fa-opencart fa-2x ic-cart me-3" aria-hidden="true" />
                </div>
                <div className="widget-notif-wrapper">
                    <div>

                        <div className="ic-notif-num">
                            <i className="fa-regular fa-bell fa-2x ic-notif " aria-hidden="true" />
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
                <a className="logged_in_name" href="#">Trần Trung</a> |
                <a style={{width: '120px'}} id="customer-logout-link" className="new-login-button" rel="nofollow" href="/logout">LOG OUT</a>
            </div>
        </div>
    )
}

export default HeaderAfterLogin;