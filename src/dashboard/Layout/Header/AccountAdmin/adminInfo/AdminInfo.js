import './AdminInfo.css';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function AdminInfo() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginUser');
    };
    return (
        <>
            <div className="d-flex align-items-center me-3">
                <div className="adminInfoGroup">
                    <img
                        src={require('../../../../../assets/images/people/daugia.jpg')}
                        alt="admin avatar"
                        className="adminAvatar"
                    ></img>
                    <span className="ms-2 fw-bold">Auction Shop</span>
                    <div className="adminInfo-dropdown">
                        <ul>
                            <li>
                                <button>
                                    <i className="me-1 fa-solid fa-user"></i>
                                    <Link to="/userInfo">Hồ sơ</Link>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={function () {
                                        Swal.fire({
                                            title: '</br> Bạn có chắc đăng xuất không ạ?',
                                            showDenyButton: true,
                                            showCancelButton: true,
                                            showConfirmButton: false,
                                            denyButtonText: `Đăng xuất`,
                                        }).then((result) => {
                                            if (result.isDenied) {
                                                logout();
                                                navigate('/login');
                                            }
                                        });
                                    }}
                                >
                                    <i className="me-1 fa-solid fa-right-from-bracket"></i>
                                    Đăng Xuất
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminInfo;
