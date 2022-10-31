import Penguin from '../PenGuin/Penguin';
import './Deny.css';
import { useNavigate } from 'react-router-dom';
export default function Deny() {
    let navigate = useNavigate();
    return (
        <div className="denyPage">
            <h1 className="denyNotification">Chỉ có ADMIN mới vào được trang quản lý</h1>
            <h2 className="denyNotification">Xin lỗi quý khách vì sự bất tiện này!</h2>
            <Penguin />
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
                Quay lại
            </button>
        </div>
    );
}
