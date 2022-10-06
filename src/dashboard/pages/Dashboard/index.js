import '../../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css';
import '../../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import '../../../assets/css/sb-admin-2.min.css';

import '../../../../node_modules/jquery/dist/jquery.min.js';
import '../../../../node_modules/jquery.easing/jquery.easing.min.js';
// import '../../../../node_modules/startbootstrap-sb-admin-2/js/sb-admin-2';
import '../../../../node_modules/chart.js/dist/Chart.min.js';
import Sidebar from './Sidebar';
import Search from './Header/Search';
import AccountAdmin from './Header/AccountAdmin';
import TongQuanThuNhap from './BieuDo/DoanhThuNam';
import DoanhThu from './BieuDo/DoanhThuThang';
import TongQuanDashboard from './TongQuanDashboard';
// import '../../../assets/js/chart-area-demo';
// import '../../../assets/js/chart-pie-demo';

function Dashboard() {
    
    return (
        <div>
            <div id="wrapper">
                {/* Sidebar */}
                <Sidebar />
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column">
                    {/* Main Content */}
                    <div id="content">
                        {/* Topbar */}
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/* Sidebar Toggle (Topbar) */}
                            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
                                <i className="fa fa-bars" />
                            </button>
                            {/* Topbar Search */}
                            <Search />
                            {/* Topbar Navbar */}
                            <AccountAdmin />
                        </nav>
                        {/* End of Topbar */}
                        {/* Begin Page Content */}
                        <div className="container-fluid">
                            {/* Page Heading */}
                            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm">
                                    <i className="fas fa-download fa-sm text-white-50" /> Generate Report
                                </a>
                            </div>
                            {/* Content Row */}
                            <TongQuanDashboard />
                            {/* Content Row */}

                            <div className="row">
                                {/* Area Chart */}
                                <TongQuanThuNhap />
                                {/* Pie Chart */}
                                <DoanhThu />
                            </div>
                        </div>
                        {/* /.container-fluid */}
                    </div>
                    {/* End of Main Content */}
                    {/* Footer */}
                    <footer className="sticky-footer bg-white">
                        <div className="container my-auto">
                            <div className="copyright text-center my-auto">
                                <span>Copyright © Your Website 2021</span>
                            </div>
                        </div>
                    </footer>
                    {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>
            {/* Logout Modal*/}
            <div
                className="modal fade"
                id="logoutModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Ready to Leave?
                            </h5>
                            <button className="close" type="button" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Select "Logout" below if you are ready to end your current session.
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-secondary" type="button" data-dismiss="modal">
                                Cancel
                            </button>
                            <a className="btn btn-primary" href="login.html">
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
