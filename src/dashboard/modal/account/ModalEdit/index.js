import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import AccountService from '../../../services/AccountService';
import { useFormik } from 'formik';
import * as yup from 'yup';
import FileService from '../../../services/FileService';
import { useDispatch } from 'react-redux';
import { addAccount, editAccount } from '../../../redux/actions';
import '../../modal.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ModalEditProduct(props) {
    const notify = () =>
        toast.success('Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    const dispatch = useDispatch();
    const { showEdit, onCloseEditAccount, accountEditId } = props;
    // console.log('accountEditId: ', accountEditId);
    const [stateImg, setStateImg] = useState(false);
    const [state, setState] = useState({
        roles: [],
        provinces: [],
    });
    const [accountById, setAccountById] = useState({});
    const [img, setImg] = useState(
        'https://freepngimg.com/thumb/youtube/62644-profile-account-google-icons-computer-user-iconfinder.png',
    );
    const [accountFrm, setAccountFrm] = useState({
        id: 0,
        provinceId: 0,
        provinceName: '',
        districtId: 0,
        districtName: '',
        wardId: 0,
        wardName: '',
        address: '',
    });

    const [location, setLocation] = useState({
        districts: [],
        wards: [],
    });

    useEffect(() => {
        try {
            async function getAddAccount() {
                let role = await AccountService.getRoles();
                let Province = await AccountService.getProvinces();
                let accountEdit = await AccountService.getAccountById(accountEditId);
                // let accountEdit = await AccountService.getAccountById(accountEditId);
                setAccountById({ ...accountEdit.data });
                console.log('accountEdit.data: ', accountEdit.data);
                setState({ ...state, roles: role.data, provinces: Province.data.results });
            }
            getAddAccount();
        } catch (error) {
            console.log(error);
        }
    }, [showEdit]);
    // useEffect(() => {
    //     try {
    //         async function getAddAccount() {
    //             let accountEdit = await AccountService.getAccountById(accountEditId);
    //             setAccountById({ ...accountEdit.data });
    //         }
    //         getAddAccount();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }, [showEdit]);

    const handleProvince = (e) => {
        try {
            async function getProvince() {
                let district = await AccountService.getDistrict(e.target.value);
                let ward = await AccountService.getWard(district.data.results[0].district_id);
                setLocation({ districts: district.data.results, wards: ward.data.results });
                setAccountFrm({
                    ...accountFrm,
                    provinceId: e.target.value,
                    districtId: district.data.results[0].district_id,
                    wardId: ward.data.results[0].ward_id,
                });
            }
            getProvince();
        } catch (error) {
            console.log(error);
        }
    };

    const handleDistrict = (e) => {
        try {
            async function getDistrict() {
                let ward = await AccountService.getWard(e.target.value);
                setLocation({ ...location, wards: ward.data.results });
                let dist = document.querySelector('#district').options.selectedIndex;
                let currentDistrict = document.querySelector('#district').options[dist].text;
                setAccountFrm({
                    ...accountFrm,
                    districtId: ward.data.results[0].district_id,
                    districtName: currentDistrict,
                    wardId: ward.data.results[0].ward_id,
                    wardName: ward.data.results[0].ward_name,
                });
            }
            getDistrict();
        } catch (error) {
            console.log(error);
        }
    };

    const handleWard = (e) => {
        let war = document.querySelector('#ward').options.selectedIndex;
        let currentWard = document.querySelector('#ward').options[war].text;
        setAccountFrm({
            ...accountFrm,
            wardId: e.target.value,
            wardName: currentWard,
        });
    };

    const handleUpload = (e) => {
        async function uploadAvatar() {
            for (let i = 0; i < e.target.files.length; i++) {
                setStateImg(true);
                let uploadResult = await FileService.Upload(e.target.files[0]);
                setImg(uploadResult.data.url);
                console.log(uploadResult.data);
                setStateImg(false);
            }
        }
        uploadAvatar();
    };
    const handleReset = () => {
        document.querySelector('#image').value = '';
        formik.handleReset();
    };

    const formik = useFormik({
        initialValues: {
            id: 0,
            fullName: accountById.fullName,
            username: accountById.username,
            email: accountById.email,
            phone: accountById.phone,
            password: accountById.password,
            repassword: '',
            blocked: accountById.blocked,
            avatar: '',
            role: {
                id: 0,
            },
            locationregion: {
                id: accountById.locationregionId,
                provinceId: accountById.locationregionProvinceId,
                provinceName: accountById.locationregionProvinceName,
                districtId: accountById.locationregionDistrictId,
                districtName: accountById.locationregionDistrictName,
                wardId: accountById.locationregionWardId,
                wardName: accountById.locationregionWardName,
                address: accountById.locationregionAddress,
            },
        },
        validationSchema: yup.object({
            fullName: yup
                .string()
                .min(8, 'tên của bạn ít nhất là 8 kí tự!')
                .max(20, 'tên của bạn tối đa nhất là 20 kí tự!')
                .required('Vui lòng nhập tên vào!'),
            username: yup
                .string()
                .min(8, 'tên sản phẩm nhỏ nhất là 8 kí tự!')
                .max(20, 'tên sản phẩm nhỏ nhất là 20 kí tự!')
                .required('Vui lòng nhập tên sản phẩm vào!'),
            email: yup.string().email().required('Vui lòng nhập tên sản phẩm vào!'),
            phone: yup.string().required('Vui lòng nhập số điện thoại!'),
            password: yup
                .string()
                .min(6, 'Mật Khẩu ít nhất là 6 kí tự!')
                .max(30, 'Mật khẩu tối đa là 30 kí tự!')
                .required('Vui lòng nhập mật khẩu!'),
            repassword: yup
                .string()
                .oneOf([yup.ref('password')], 'Mật khẩu phải trùng nhau!')
                .required('Vui lòng nhập lại mật khẩu!'),
            role: yup.object().shape({ id: yup.string().required('Vui lòng chọn quyển hạn!') }),
            locationregion: yup.object().shape({ provinceId: yup.string().required('Vui lòng chọn Tỉnh Thành phố!') }),
            locationregion: yup.object().shape({ districtId: yup.string().required('Vui lòng chọn Quận / huyện!') }),
            locationregion: yup.object().shape({ wardId: yup.string().required('Vui lòng chọn Thôn / xã!') }),
            locationregion: yup.object().shape({ address: yup.string().required('Vui lòng Nhập địa chỉ!') }),
        }),
        onSubmit: (account) => {
            let provinceId = document.querySelector('#province').value;
            let prov = document.querySelector('#province').options.selectedIndex;
            let currentProvince = document.querySelector('#province').options[prov].text;

            let districtId = document.querySelector('#district').value;
            let dist = document.querySelector('#district').options.selectedIndex;
            let currentDistrict = document.querySelector('#district').options[dist].text;

            let wardId = document.querySelector('#ward').value;
            let war = document.querySelector('#ward').options.selectedIndex;
            let currentWard = document.querySelector('#ward').options[war].text;

            let roleId = Number(document.querySelector('#role').value);

            account.avatar = img;
            account.role.id = roleId;
            account.locationregion.id = accountById.locationregion.id;
            account.locationregion.provinceId = provinceId;
            account.locationregion.provinceName = currentProvince;
            account.locationregion.districtId = districtId;
            account.locationregion.districtName = currentDistrict;
            account.locationregion.wardId = wardId;
            account.locationregion.wardName = currentWard;
            console.log('account: ', account);

            handleReset();
            dispatch(editAccount(account, accountEditId));
            notify();
        },
    });

    const { roles, provinces } = state;
    const { districts, wards } = location;
    return (
        <Modal show={showEdit} onHide={onCloseEditAccount} backdrop="static" keyboard={false} size="xl">
            <Modal.Header closeButton>
                <Modal.Title style={{ color: 'black' }}>Edit Account</Modal.Title>
            </Modal.Header>
            <form onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <Modal.Body>
                    <div className="frmError">
                        <ul>
                            {formik.errors.fullName && formik.errors.fullName && (
                                <li className="error">{formik.errors.fullName}</li>
                            )}
                            {formik.errors.email && formik.errors.email && (
                                <li className="error">{formik.errors.email}</li>
                            )}
                            {formik.errors.username && formik.errors.username && (
                                <li className="error">{formik.errors.username}</li>
                            )}
                            {formik.errors.password && formik.errors.password && (
                                <li className="error">{formik.errors.password}</li>
                            )}
                            {formik.errors.repassword && formik.errors.repassword && (
                                <li className="error">{formik.errors.repassword}</li>
                            )}
                            {formik.errors.phone && formik.errors.phone && (
                                <li className="error">{formik.errors.phone}</li>
                            )}
                            {formik.errors.role && formik.errors.role && (
                                <li className="error">{formik.errors.role}</li>
                            )}
                            {formik.errors.districtname && formik.errors.districtname && (
                                <li className="error">{formik.errors.districtname}</li>
                            )}
                            {formik.errors.wardname && formik.errors.wardname && (
                                <li className="error">{formik.errors.wardname}</li>
                            )}
                            {formik.errors.address && formik.errors.address && (
                                <li className="error">{formik.errors.address}</li>
                            )}
                        </ul>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên đầy đủ:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Vui lòng nhập họ và tên..."
                                    value={formik.values.fullName || accountById.fullName}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Email:
                                </label>
                                <input
                                    type="Email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Vui lòng nhập Email..."
                                    value={formik.values.email || accountById.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-4">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên đăng nhập:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="Vui lòng nhập tên đăng nhập..."
                                    value={formik.values.username || accountById.username}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Mật khẩu:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Vui lòng nhập mật khẩu..."
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-3 col-4">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Nhập lại mật khẩu:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="repassword"
                                    id="repassword"
                                    placeholder="Vui lòng nhập lại mật khẩu..."
                                    value={formik.values.repassword}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row mb-3 ">
                            <div className="col-6">
                                <label htmlFor="addAvailable" className="form-label text-dark font-weight-bold ml-2">
                                    Số điện thoại:
                                </label>
                                <input
                                    type="phone"
                                    className="form-control"
                                    value={formik.values.phone || accountById.phone}
                                    onChange={formik.handleChange}
                                    name="phone"
                                    id="phone"
                                    placeholder="Vui lòng nhập số điện thoại..."
                                />
                            </div>
                            <div className="col-6">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Quyền hạn:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="role"
                                    name="role.id"
                                    value={formik.values.role.id}
                                    onChange={formik.handleChange}
                                >
                                    {/* <option value={0} key={0} defaultChecked disabled>
                                        Chọn
                                    </option> */}
                                    {roles.map((role) => (
                                        <option value={role.id} key={role.id}>
                                            {role.code}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row mb-3 ">
                            <div className="col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Tỉnh / Thành phố:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="province"
                                    name="locationregion.provinceId"
                                    value={formik.values.locationregion.provinceId}
                                    onChange={formik.handleChange}
                                    onInput={handleProvince}
                                >
                                    {provinces && (
                                        <option value={-1} key={-1} selected disabled>
                                            Chọn
                                        </option>
                                    )}
                                    {provinces.map((province) => (
                                        <option
                                            value={province.province_id}
                                            key={province.province_id}
                                            // onClick={() => handleProvince(province.id)}
                                        >
                                            {province.province_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Quận / Huyện:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="district"
                                    name="locationregion.districtId"
                                    value={formik.values.districtId}
                                    onChange={formik.handleChange}
                                    onInput={handleDistrict}
                                >
                                    {districts ? (
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
                                    ))}
                                </select>
                            </div>
                            <div className="col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Thôn / Thị xã:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="ward"
                                    name="locationregion.wardId"
                                    value={formik.values.locationregion.wardId}
                                    onChange={formik.handleChange}
                                    onInput={handleWard}
                                >
                                    {wards ? (
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
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-6">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    Ảnh:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    multiple="multiple"
                                    accept="image/*"
                                    id="image"
                                    name="image"
                                    placeholder="Vui lòng chọn file..."
                                    onInput={handleUpload}
                                />
                            </div>
                            <div className="mb-3 col-6">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    Địa chỉ:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="locationregion.address"
                                    placeholder="Vui lòng nhập địa chỉ..."
                                    value={formik.values.locationregion.address || accountById.locationregionAddress}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="reset" variant="secondary w-auto" onClick={onCloseEditAccount}>
                        Close
                    </Button>
                    {stateImg ? (
                        <Button type="submit" className="btn btn-primary">
                            <span className="spinner-border text-info"></span>
                        </Button>
                    ) : (
                        <Button type="submit" className="btn btn-primary">
                            Save
                        </Button>
                    )}
                    <ToastContainer />
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default ModalEditProduct;
