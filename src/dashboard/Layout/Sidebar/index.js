import { Link } from 'react-router-dom';
import SidebarComponent from './SidebarComponent';
import SidebarUtilities from './SidebarUtilelties';

function Sidebar() {
    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="/dashboard">
                <div className="box elegant">
                    <div
                        className="paragraph-logo"
                        style={{
                            fontSize: '20px',
                            textShadow: '-5px 5px 3px #333',
                            color: '#d76060',
                            fontWeight: 'bold',
                        }}
                    >
                        AUCTIONS SHOP
                    </div>
                </div>
            </Link>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                    <i class="fa-solid fa-store"></i>
                    <span>TRANG QUẢN LÝ</span>
                </Link>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Quản lý</div>

            <SidebarComponent />

            <SidebarUtilities />

            <hr className="sidebar-divider" />
        </ul>
    );
}

export default Sidebar;
