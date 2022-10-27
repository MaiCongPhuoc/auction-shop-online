import '../dashboard.css';
function DoanhThuTrongThang() {
    return (
        <div className="col-xl-3 col-md-6 mb-4">
            <div className="card border-left-primary shadow h-100 py-2" style={{ cursor: 'auto' }}>
                <div className="card-body">
                    <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                            <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                <a href="#">Doanh thu (Tháng)</a>
                            </div>
                            <div className="h5 mb-0 ml-1 font-weight-bold text-gray-800">$40,000</div>
                        </div>
                        <div className="col-auto">
                            <i className="fas fa-calendar fa-2x text-black-300" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DoanhThuTrongThang;
