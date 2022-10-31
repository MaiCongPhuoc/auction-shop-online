import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function UserInfo() {
    let userLoggedin = JSON.parse(localStorage.getItem('loginUser'));

    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('loginUser');
    };
    return (
        <>
            <div className="base-width-reg main-yield" style={{ maxWidth: '96%' }}>
                <h3 style={{ color: 'yellow' }}>THÔNG TIN TÀI KHOẢN</h3>
                <hr />
                <div className="modal-body">
                    <div className="row">
                        <div className="mb-2 col-4">
                            <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                Tên đăng nhập:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="username"
                                id="username"
                                placeholder="Vui lòng nhập tên đăng nhập..."
                                // onChange={changeHandler}
                                // defaultValue={userLoggedin.username}
                            />
                        </div>
                        <div className="mb-2 col-4">
                            <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                Tên đầy đủ:
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                name="fullName"
                                id="fullName"
                                placeholder="Vui lòng nhập họ và tên..."
                                // onChange={changeHandler}
                                // defaultValue={userLoggedin.fullName}
                            />
                        </div>
                        <div className="mb-2 col-4">
                            <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                Email:
                            </label>
                            <input
                                type="Email"
                                className="form-control"
                                name="email"
                                id="email"
                                placeholder="Vui lòng nhập Email..."
                                // onChange={changeHandler}
                                // defaultValue={userLoggedin.email}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2 col-4">
                            <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                Mật khẩu:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                id="password"
                                placeholder="Vui lòng nhập mật khẩu..."
                                // defaultValue={userLoggedin.password}
                            />
                        </div>
                        <div className="mb-2 col-4">
                            <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                Nhập lại mật khẩu:
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                name="repassword"
                                id="repassword"
                                placeholder="Vui lòng nhập lại mật khẩu..."
                                // defaultValue={userLoggedin.cpassword}
                            />
                        </div>
                        <div className="mb-2 col-4">
                            <label htmlFor="addAvailable" className="form-label text-dark font-weight-bold ml-2">
                                Số điện thoại:
                            </label>
                            <input
                                type="tel"
                                className="form-control"
                                id="address"
                                name="phone"
                                placeholder="Vui lòng nhập số điện thoại..."
                                // defaultValue={userLoggedin.phone}
                            />
                        </div>
                    </div>
                    <div className="row mb-2 ">
                        <div className="col-4">
                            <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                Tỉnh / Thành phố:
                            </label>
                            <select
                                className="form-select select select-bg-ori"
                                id="province"
                                name="locationRegion.provinceId"
                                // onInput={handleProvince}
                                // value={userLoggedin.locationRegion.provinceId}
                            >
                                {/* {provinces && (
                                    <option value={-1} key={-1} selected disabled>
                                        Chọn
                                    </option>
                                )}
                                {provinces.map((province) => (
                                    <option value={province.province_id} key={province.province_id}>
                                        {province.province_name}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                        <div className="col-4">
                            <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                Quận / Huyện:
                            </label>
                            <select
                                className="form-select select select-bg-ori"
                                id="district"
                                name="locationRegion.districtId"
                                // onInput={handleDistrict}
                                // defaultValue={userLoggedin.locationRegion.districtId}
                            >
                                {/* {districts ? (
                                    ''
                                ) : (
                                    <option value={-1} key={-1} defaultValue disabled>
                                        Chọn tỉnh / Thành phố:
                                    </option>
                                )}
                                {districts.map((district) => (
                                    <option value={district.district_id} key={district.district_id}>
                                        {district.district_name}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                        <div className="col-4">
                            <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                Thôn / Thị xã:
                            </label>
                            <select
                                className="form-select select select-bg-ori"
                                id="ward"
                                name="locationRegion.wardId "
                                // onInput={handleWard}
                                // defaultValue={userLoggedin.locationRegion.wardId}
                            >
                                {/* {wards ? (
                                    ''
                                ) : (
                                    <option value={-1} key={-1} defaultValue disabled>
                                        Chọn tỉnh / Thành phố:
                                    </option>
                                )}
                                {wards.map((ward) => (
                                    <option value={ward.ward_id} key={ward.ward_id}>
                                        {ward.ward_name}
                                    </option>
                                ))} */}
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-2 col-4">
                            <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                Ảnh:
                            </label>
                            {/* <img defaultValue={userLoggedin.avatar} src="" alt="" /> */}
                            {/* <input
                                type="file"
                                className="form-control"
                                multiple="multiple"
                                accept="image/*"
                                id="image"
                                name="avatar"
                                placeholder="Vui lòng chọn file..."
                                // defaultValue={userLoggedin.avatar}
                            /> */}
                        </div>
                        <div className="mb-2 col-4">
                            <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                Địa chỉ:
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                id="address"
                                name="locationRegion.address"
                                placeholder="Vui lòng nhập địa chỉ..."
                                // defaultValue={userLoggedin.locationRegion.address}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                Quyền hạn:
                            </label>
                            <select
                                className="form-select select select-bg-ori"
                                id="role"
                                name="role.id"
                                // value={formik.values.role.id}
                                // defaultValue={userLoggedin.role}
                            >
                                {/* <option value={0} key={0} defaultChecked disabled>
                                        Chọn
                                    </option> */}
                                {/* {roles.map((role) => (
                                        <option value={role.id} key={role.id}>
                                            {role.code}
                                        </option>
                                    ))} */}
                            </select>
                        </div>
                    </div>
                    <button
                        className="btn btn-danger mt-3"
                        onClick={() => {
                            Swal.fire({
                                icon: 'warning',
                                title: '</br> Bạn có chắc đăng xuất không?',
                                showDenyButton: true,
                                showCancelButton: true,
                                showConfirmButton: false,
                                denyButtonText: `Đăng xuất`,
                            }).then((result) => {
                                if (result.isDenied) {
                                    toast.success(`Đăng xuất thành công!`);
                                    setTimeout(() => {
                                        navigate('/login');
                                        logout();
                                    }, 2000);
                                }
                            });
                        }}
                    >
                        Đăng xuất
                    </button>
                </div>
            </div>
        </>
    );
}
