import { Link } from 'react-router-dom';
import SidebarComponent from './SidebarComponent';
import SidebarPage from './SidebarPage';
import SidebarUtilities from './SidebarUtilelties';

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            {/* Sidebar - Brand */}
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    HPTP BID<sup></sup>
                </div>
            </Link>
            {/* Divider */}
            <hr className="sidebar-divider my-0" />
            {/* Nav Item - Dashboard */}
            <li className="nav-item active">
                <Link className="nav-link" to="/product">
                    <i class="fa-solid fa-store"></i>
                    <span>TRANG BÁN HÀNG</span>
                </Link>
            </li>
            {/* Divider */}
            <hr className="sidebar-divider" />
            {/* Heading */}
            <div className="sidebar-heading">Quản lý</div>

            {/* Nav Item - Pages Collapse Menu */}
            <SidebarComponent />

            {/* Nav Item - Utilities Collapse Menu */}
            <SidebarUtilities />
            {/* Divider */}

            <hr className="sidebar-divider" />
            {/* Heading */}
            {/* <div className="sidebar-heading">Addons</div> */}

            {/* Nav Item - Pages Collapse Menu */}
            {/* <SidebarPage /> */}
            {/* Nav Item - Charts */}

            {/* <li className="nav-item">
                <a className="nav-link" href="charts.html">
                    <i className="fas fa-fw fa-chart-area" />
                    <span>Charts</span>
                </a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="tables.html">
                    <i className="fas fa-fw fa-table" />
                    <span>Tables</span>
                </a>
            </li> */}
        </ul>
    );
}

export default Sidebar;
