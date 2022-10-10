import DoanhThuTrongNam from './DoanhThuTrongNam';
import DoanhThuTrongThang from './DoanhThuTrongThang';
import SanPham from './SanPham';
import TaiKhoan from './TaiKhoan';

function TongQuanDashboard() {
    return (
        <div className="row">
            {/* Earnings (Monthly) Card Example */}
            <DoanhThuTrongThang />
            {/* Earnings (Monthly) Card Example */}
            <DoanhThuTrongNam />
            {/* Earnings (Monthly) Card Example */}
            <SanPham />
            {/* Pending Requests Card Example */}
            <TaiKhoan />
        </div>
    );
}

export default TongQuanDashboard;
