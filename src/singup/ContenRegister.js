import React from 'react';
import AccountInfo from './AccountInfo';
import './asset/css/content.css';
import AccountSingupPhone from './AccountSingupPhone';
import AccountSingupInfo from './AccountSingupInfo';
import AccountLocation from './AccountLocation';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from './../login/api';
import AccountService from './../dashboard/services/AccountService';
import FileService from './../dashboard/services/FileService';
import { useFormik } from 'formik';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginStatus, setShowSignupInfo } from './../products/redux/actions';
let flag = false;
const ContenRegister = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const [user, setUserDetails] = useState({
        username: '',
        fullName: '',
        phone: '',
        email: '',
        avatar: '',
        locationRegion: {
            id: 0,
            provinceId: null,
            provinceName: null,
            districtId: null,
            districtName: null,
            wardId: null,
            wardName: null,
            address: null,
        },
        password: '',
        repassword: '',
    });
    const validateForm = (values) => {
        const error = {};
        const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            error.username = 'Tên đăng nhập không được để trống!';
        }
        // if (!values.locationRegion.address) {
        //     error.locationRegion.address = 'Địa chỉ không được để trống!';
        // }
        if (!values.fullName) {
            error.fullName = 'Tên đầy đủ không được để trống!';
        }
        if (!values.email) {
            error.email = 'Email không được để trống!';
        } else if (!regex.test(values.email)) {
            error.email = 'Nhập đúng định dạng Email!';
        }
        if (!values.password) {
            error.password = 'Mật khẩu không được để trống!';
        } else if (values.password.length < 7) {
            error.password = 'Mật khẩu phải nhiều hơn 7 ký tự!';
        } else if (values.password.length > 15) {
            error.password = 'Mật khẩu không được vượt quá 15 ký tự!';
        }
        if (!values.cpassword) {
            error.cpassword = 'Xác nhận mật khẩu là bắt buộc!';
        } else if (values.cpassword !== values.password) {
            error.cpassword = 'Xác nhận mật khẩu và mật khẩu phải giống nhau!';
        }
        return error;
    };
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...user,
            [name]: value,
        });
    };
    const signupHandler = (e) => {
        e.preventDefault();
        setFormErrors(validateForm(user));
        setIsSubmit(true);
    };
    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            axios.post('http://localhost:8080/api/auth/register', user).then((res) => {
                if (res.data) {
                    console.log('user: ', user);
                    dispatch(setShowSignupInfo(true));
                    toast.success(`Đăng ký thành công!`);
                    setTimeout(() => {
                        navigate('/login', { replace: true });
                    }, 2000);
                } else {
                }
            });
        }
    }, [formErrors]);

    const [stateImg, setStateImg] = useState(false);
    const [img, setImg] = useState(
        'https://freepngimg.com/thumb/youtube/62644-profile-account-google-icons-computer-user-iconfinder.png',
    );
    const [accountFrm, setAccountFrm] = useState({});
    const [state, setState] = useState({
        provinces: [],
    });

    const [location, setLocation] = useState({
        districts: [],
        wards: [],
    });
    const { provinces } = state;
    const { districts, wards } = location;
    useEffect(() => {
        try {
            async function getAllProvinces() {
                let Province = await AccountService.getProvinces();
                setState({ ...state, provinces: Province.data.results });
            }
            getAllProvinces();
        } catch (error) {
            console.log(error);
        }
    }, []);
    // useEffect(() => {
    //     if (flag) {
    //         try {
    //             async function postData() {
    //                 // let createRes = await axios.post('http://localhost:8080/api/auth/register')(accountFrm);
    //                 // console.log('createRes: ', createRes.data);
    //             }
    //             postData();
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // }, [accountFrm]);

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
        handleReset();
        // formik.handleReset();
    };

    const formik = useFormik({
        initialValues: {
            id: 0,
            username: '',
            fullName: '',
            email: '',
            password: '',
            repassword: '',
            phone: '',
            blocked: 0,
            avatar: 'https://freepngimg.com/thumb/youtube/62644-profile-account-google-icons-computer-user-iconfinder.png',

            locationRegion: {
                id: 0,
                provinceId: 0,
                provinceName: '',
                districtId: 0,
                districtName: '',
                wardId: 0,
                wardName: '',
                address: '',
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
                .min(8, 'Mật Khẩu ít nhất là 8 kí tự!')
                .max(20, 'Mật khẩu tối đa là 20 kí tự!')
                .required('Vui lòng nhập mật khẩu!'),
            repassword: yup
                .string()
                .oneOf([yup.ref('password')], 'Mật khẩu phải trùng nhau!')
                .required('Vui lòng nhập lại mật khẩu!'),
            locationRegion: yup.object().shape({ provinceId: yup.string().required('Vui lòng chọn Tỉnh Thành phố!') }),
            locationRegion: yup.object().shape({ districtId: yup.string().required('Vui lòng chọn Quận / huyện!') }),
            locationRegion: yup.object().shape({ wardId: yup.string().required('Vui lòng chọn Thôn / xã!') }),
            locationRegion: yup.object().shape({ address: yup.string().required('Vui lòng Nhập địa chỉ!') }),
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

            flag = true;
            account.avatar = img;
            account.locationRegion.provinceId = provinceId;
            account.locationRegion.provinceName = currentProvince;
            account.locationRegion.districtId = districtId;
            account.locationRegion.districtName = currentDistrict;
            account.locationRegion.wardId = wardId;
            account.locationRegion.wardName = currentWard;
            console.log('add count: ', account);
            handleReset();
            setAccountFrm(account);
            notify();
        },
    });

    const notify = () =>
        toast.success('Đăng ký thành công!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    return (
        <>
            <form className="alo" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <div className="base-width-reg main-yield" style={{ maxWidth: '96%' }}>
                    {/* <div className="sorter-wrapper col-6">
                    <AccountInfo />
                </div>
                <div className="sorter-wrapper col-6">
                    <AccountSingupPhone />
                    <AccountSingupInfo />
                    <AccountLocation />
                </div> */}
                    <h3 style={{ color: 'yellow' }}>ĐĂNG KÝ THÔNG TIN TÀI KHOẢN</h3>
                    <hr />
                    <div className="modal-body">
                        <div className="frmError row">
                            <ul>
                                {formik.errors.fullName && formik.errors.fullName && (
                                    <li className="error">{formik.errors.fullName}</li>
                                )}
                                {formik.errors.email && formik.errors.email && (
                                    <li className="error">{formik.errors.email}</li>
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
                                {formik.errors.districtName && formik.errors.districtName && (
                                    <li className="error">{formik.errors.districtName}</li>
                                )}
                                {formik.errors.wardName && formik.errors.wardName && (
                                    <li className="error">{formik.errors.wardName}</li>
                                )}
                                {formik.errors.address && formik.errors.address && (
                                    <li className="error">{formik.errors.address}</li>
                                )}
                                {formik.errors.username && formik.errors.username && (
                                    <li className="error">{formik.errors.username}</li>
                                )}
                            </ul>
                        </div>
                        <div className="row">
                            <div className="mb-2 col-4">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên đăng nhập:
                                </label>
                                <p style={{ color: 'red' }}>{formErrors.username}</p>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="Vui lòng nhập tên đăng nhập..."
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    Tên đầy đủ:
                                </label>
                                <p style={{ color: 'red' }}>{formErrors.fullName}</p>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Vui lòng nhập họ và tên..."
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Email:
                                </label>
                                <p style={{ color: 'red' }}>{formErrors.email}</p>
                                <input
                                    type="Email"
                                    className="form-control"
                                    name="email"
                                    id="email"
                                    placeholder="Vui lòng nhập Email..."
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-2 col-4">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Mật khẩu:
                                </label>
                                <p style={{ color: 'red' }}>{formErrors.password}</p>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Vui lòng nhập mật khẩu..."
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Nhập lại mật khẩu:
                                </label>
                                <p style={{ color: 'red' }}>{formErrors.cpassword}</p>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="repassword"
                                    id="repassword"
                                    placeholder="Vui lòng nhập lại mật khẩu..."
                                    value={formik.values.repassword}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addAvailable" className="form-label text-dark font-weight-bold ml-2">
                                    Số điện thoại:
                                </label>
                                <p style={{ color: 'red' }}>{formErrors.phone}</p>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="address"
                                    name="phone"
                                    placeholder="Vui lòng nhập số điện thoại..."
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
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
                                    onInput={handleProvince}
                                    onChange={changeHandler}
                                    value={user.locationRegion.provinceId}
                                >
                                    {provinces && (
                                        <option value={-1} key={-1} selected disabled>
                                            Chọn
                                        </option>
                                    )}
                                    {provinces.map((province) => (
                                        <option value={province.province_id} key={province.province_id}>
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
                                    name="locationRegion.districtId"
                                    onInput={handleDistrict}
                                    onChange={changeHandler}
                                    value={user.locationRegion.districtId}
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
                                    name="locationRegion.wardId "
                                    onInput={handleWard}
                                    onChange={changeHandler}
                                    value={user.locationRegion.wardId}
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
                            <div className="mb-2 col-6">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    Ảnh:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    multiple="multiple"
                                    accept="image/*"
                                    id="image"
                                    name="avatar"
                                    placeholder="Vui lòng chọn file..."
                                    onInput={handleUpload}
                                />
                            </div>
                            <div className="mb-2 col-6">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    Địa chỉ:
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="locationRegion.address"
                                    placeholder="Vui lòng nhập địa chỉ..."
                                    onChange={changeHandler}
                                    value={user.locationRegion.address}
                                />
                            </div>
                        </div>
                        <button className="signinBtn btn btn-primary" onClick={signupHandler}>
                            ĐĂNG KÝ
                        </button>
                    </div>
                </div>
            </form>

            {/* {stateImg ? (
                <Button type="submit" className="btn btn-primary">
                    <span className="spinner-border text-info"></span>
                </Button>
            ) : (
                <Button type="submit" className="btn btn-primary">
                    Create
                </Button>
            )} */}
            <ToastContainer />
        </>
    );
};

export default ContenRegister;
