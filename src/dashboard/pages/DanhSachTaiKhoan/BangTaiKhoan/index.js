function BangTaiKhoan() {
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-between">
                <h1 className="h3 mb-2 text-gray-800">Danh sách tài khoản</h1>
                {/* <p className="mb-4">
                    DataTables is a third party plugin that is used to generate the demo table below. For more information
                    about DataTables, please visit the{'{'}' '{'}'}
                    <a target="_blank" href="https://datatables.net">
                        official DataTables documentation
                    </a>
                </p> */}
                <form className="d-none d-sm-inline-block form-inline ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control bg-light small"
                            placeholder="Tìm kiếm người dùng..."
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
            </div>
            <div className="card shadow mb-4">
                <div className="card-header py-3 d-flex justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Danh sách tài khoản</h6>
                    <button className="btn btn-primary mr-2">Add</button>
                </div>
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered" id="dataTable" width="100%" cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>Avatar</th>
                                    <th>Tên đầy đủ</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Tỉnh/Thành Phố</th>
                                    <th>Quận/Huyện</th>
                                    <th>Thôn/ Xã</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src="data:image/png;base64,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" /></td>
                                    <td>Tiger Nixon</td>
                                    <td>
                                        American
                                    </td>
                                    <td>System Architect</td>
                                    <td>Edinburgh</td>
                                    <td>61</td>
                                    <td>2011/04/25</td>
                                    <td>$320,800</td>
                                    <td className="text-center">
                                        <button className="btn btn-outline-secondary">Sửa</button>
                                        <button className="btn btn-outline-danger ml-2">Xóa</button>
                                        <button className="btn btn-outline-info ml-2">Đổi MK</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Garrett Winters</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>63</td>
                                    <td>2011/07/25</td>
                                    <td>$170,750</td>
                                </tr>
                                <tr>
                                    <td>Ashton Cox</td>
                                    <td>Junior Technical Author</td>
                                    <td>San Francisco</td>
                                    <td>66</td>
                                    <td>2009/01/12</td>
                                    <td>$86,000</td>
                                </tr>
                                <tr>
                                    <td>Cedric Kelly</td>
                                    <td>Senior Javascript Developer</td>
                                    <td>Edinburgh</td>
                                    <td>22</td>
                                    <td>2012/03/29</td>
                                    <td>$433,060</td>
                                </tr>
                                <tr>
                                    <td>Airi Satou</td>
                                    <td>Accountant</td>
                                    <td>Tokyo</td>
                                    <td>33</td>
                                    <td>2008/11/28</td>
                                    <td>$162,700</td>
                                </tr>
                                <tr>
                                    <td>Brielle Williamson</td>
                                    <td>Integration Specialist</td>
                                    <td>New York</td>
                                    <td>61</td>
                                    <td>2012/12/02</td>
                                    <td>$372,000</td>
                                </tr>
                                <tr>
                                    <td>Herrod Chandler</td>
                                    <td>Sales Assistant</td>
                                    <td>San Francisco</td>
                                    <td>59</td>
                                    <td>2012/08/06</td>
                                    <td>$137,500</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>Name</th>
                                    <th>Position</th>
                                    <th>Office</th>
                                    <th>Age</th>
                                    <th>Start date</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BangTaiKhoan;
