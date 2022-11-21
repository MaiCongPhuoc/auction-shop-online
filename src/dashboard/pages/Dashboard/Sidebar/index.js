import SidebarComponent from './SidebarComponent';
import SidebarPage from './SidebarPage';
import SidebarUtilities from './SidebarUtilelties';

function Sidebar() {

    return (
        <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
            <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div className="sidebar-brand-icon rotate-n-15">
                    <i className="fas fa-laugh-wink" />
                </div>
                <div className="sidebar-brand-text mx-3">
                    SB Admin <sup>2</sup>
                </div>
            </a>
            <hr className="sidebar-divider my-0" />
            <li className="nav-item active">
                <a className="nav-link" href="index.html">
                    <i className="fas fa-fw fa-tachometer-alt" />
                    <span>Dashboard</span>
                </a>
            </li>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Interface</div>

            <SidebarComponent />

            <SidebarUtilities />
            
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">Addons</div>

            <SidebarPage />
            
            <li className="nav-item">
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
            </li>
            <hr className="sidebar-divider d-none d-md-block" />
            <div className="text-center d-none d-md-inline">
                <button className="rounded-circle border-0" id="sidebarToggle" />
            </div>
            <div className="sidebar-card d-none d-lg-flex">
                <img className="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="..." />
                <p className="text-center mb-2">
                    <strong>SB Admin Pro</strong> is packed with premium features, components, and more!
                </p>
                <a className="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">
                    Upgrade to Pro!
                </a>
            </div>
        </ul>
    );
}

export default Sidebar;
