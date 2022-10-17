import Tippy from '@tippyjs/react';
import { useState } from 'react';
import AdminInfo from './adminInfo/AdminInfo';

function AccountAdmin() {
    const renderThongBao = () => {
        return (
            <div className="dropdown-list dropdown-menu-right shadow animated--grow-in" id="thongbao">
                <h6 className="dropdown-header">Alerts Center</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                        <div className="icon-circle bg-primary">
                            <i className="fas fa-file-alt text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 12, 2019</div>
                        <span className="font-weight-bold">A new monthly report is ready to download!</span>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                        <div className="icon-circle bg-success">
                            <i className="fas fa-donate text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 7, 2019</div>
                        $290.29 has been deposited into your account!
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="mr-3">
                        <div className="icon-circle bg-warning">
                            <i className="fas fa-exclamation-triangle text-white" />
                        </div>
                    </div>
                    <div>
                        <div className="small text-gray-500">December 2, 2019</div>
                        Spending Alert: We've noticed unusually high spending for your account.
                    </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">
                    Show All Alerts
                </a>
            </div>
        );
    };

    const renderTinNhan = () => {
        return (
            <div
                className="dropdown-list dropdown-menu-right shadow animated--grow-in"
                aria-labelledby="messagesDropdown"
            >
                <h6 className="dropdown-header">Message Center</h6>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="img/undraw_profile_1.svg" alt="..." />
                        <div className="status-indicator bg-success" />
                    </div>
                    <div className="font-weight-bold">
                        <div className="text-truncate">
                            Hi there! I am wondering if you can help me with a problem I've been having.
                        </div>
                        <div className="small text-gray-500">Emily Fowler · 58m</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="img/undraw_profile_2.svg" alt="..." />
                        <div className="status-indicator" />
                    </div>
                    <div>
                        <div className="text-truncate">
                            I have the photos that you ordered last month, how would you like them sent to you?
                        </div>
                        <div className="small text-gray-500">Jae Chun · 1d</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="img/undraw_profile_3.svg" alt="..." />
                        <div className="status-indicator bg-warning" />
                    </div>
                    <div>
                        <div className="text-truncate">
                            Last month's report looks great, I am very happy with the progress so far, keep up the good
                            work!
                        </div>
                        <div className="small text-gray-500">Morgan Alvarez · 2d</div>
                    </div>
                </a>
                <a className="dropdown-item d-flex align-items-center" href="#">
                    <div className="dropdown-list-image mr-3">
                        <img className="rounded-circle" src="https://source.unsplash.com/Mv9hjnEUHR4/60x60" alt="..." />
                        <div className="status-indicator bg-success" />
                    </div>
                    <div>
                        <div className="text-truncate">
                            Am I a good boy? The reason I ask is because someone told me that people say this to all
                            dogs, even if they aren't good...
                        </div>
                        <div className="small text-gray-500">Chicken the Dog · 2w</div>
                    </div>
                </a>
                <a className="dropdown-item text-center small text-gray-500" href="#">
                    Read More Messages
                </a>
            </div>
        );
    };

    const renderAccuont = () => {
        return (
            <div
                className="dropdown-menu-right shadow animated--grow-in accountAdmin rounded-3"
                aria-labelledby="userDropdown"
            >
                <a className="dropdown-item p-2" href="#">
                    <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                    Profile
                </a>
                <a className="dropdown-item p-2" href="#">
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
                </a>
            </div>
        );
    };
    return (
        <ul className="navbar-nav ml-auto">
            {/* Nav Item - Search Dropdown (Visible Only XS) */}
            <li className="nav-item dropdown no-arrow d-sm-none">
                <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="searchDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    <i className="fas fa-search fa-fw" />
                </a>
                {/* Dropdown - Messages */}
                {/* <div
                    className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
                    aria-labelledby="searchDropdown"
                >
                    <form className="form-inline mr-auto w-100 navbar-search">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control bg-light border-0 small"
                                placeholder="Search for..."
                                aria-label="Search"
                                aria-describedby="basic-addon2"
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    <i className="fas fa-search fa-sm" />
                                </button>
                            </div>
                        </div>
                    </form>
                </div> */}
            </li>
            {/* Nav Item - Alerts */}
            <li className="nav-item dropdown no-arrow mx-1">
                <Tippy
                    // delay={[0, 700]}
                    // offset={[15, 8]}
                    placement="bottom-end"
                    interactive
                    content={renderThongBao()}
                    hideOnClick={true}
                    trigger="click"
                >
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="alertsDropdown"
                        // role="button"
                        // data-toggle="dropdown"
                        // aria-haspopup="true"
                        // aria-expanded="false"
                    >
                        <i className="fas fa-bell fa-fw" />
                        {/* Counter - Alerts */}
                        <span className="badge badge-danger badge-counter">3+</span>
                    </a>
                </Tippy>

                {/* Dropdown - Alerts */}
            </li>
            {/* Nav Item - Messages */}
            <li className="nav-item dropdown no-arrow mx-1">
                <Tippy
                    // delay={[0, 700]}
                    // offset={[15, 8]}
                    placement="bottom-end"
                    interactive
                    content={renderTinNhan()}
                    hideOnClick={true}
                    trigger="click"
                >
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="messagesDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <i className="fas fa-envelope fa-fw" />
                        {/* Counter - Messages */}
                        <span className="badge badge-danger badge-counter">7</span>
                    </a>
                </Tippy>
                {/* Dropdown - Messages */}
            </li>
            <div className="topbar-divider d-none d-sm-block" />
            {/* Nav Item - User Information */}
            <li className="nav-item dropdown no-arrow">
                {/* <Tippy
                    // delay={[0, 700]}
                    // offset={[15, 8]}
                    placement="bottom-end"
                    interactive
                    content={renderAccuont()}
                    hideOnClick={true}
                    trigger="click"
                >
                    <a
                        className="nav-link dropdown-toggle"
                        href="#"
                        id="userDropdown"
                        role="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                        <img className="img-profile rounded-circle" src="img/undraw_profile.svg" />
                    </a>
                </Tippy> */}
                {/* Nav Item - User Information */}
                <li className="nav-item dropdown no-arrow">
                    <br />
                    <AdminInfo />
                    {/* Dropdown - User Information */}
                </li>
                {/* Dropdown - User Information */}
            </li>
        </ul>
    );
}

export default AccountAdmin;
