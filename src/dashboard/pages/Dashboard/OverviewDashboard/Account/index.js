function TaiKhoan(props) {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-warning shadow h-100 py-2" style={{ cursor: 'auto' }}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                <a href="/list-account">Tài Khoản</a>
                            </div>
                            <div className="h5 mb-0 ml-1 font-weight-bold text-gray-800">
                                <a href="/list-account">{props.totalAccount}</a>
                            </div>
                        </div>
                        <div className="col-auto">
                            <a href="/list-account">
                                {' '}
                                <i className="fa-solid fa-users-viewfinder fa-2x text-gray-300" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TaiKhoan;
