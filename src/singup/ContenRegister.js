import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useFormik } from 'formik';
import * as yup from 'yup';
import './asset/css/content.css';
import AccountService from '../dashboard/services/AccountService';
import FileService from './../dashboard/services/FileService';
import AuthService from '../dashboard/services/AuthService';

let flag = false;
const ContenRegister = () => {
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

    useEffect(() => {
        if (flag) {
            async function register() {
                await AuthService.postRegister(accountFrm);
            }
            register();
            flag = false;
            try {
            } catch (error) {}
        }
    }, [accountFrm]);

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
            username: '',
            fullName: '',
            email: '',
            password: '',
            repassword: '',
            phone: '',
            blocked: 0,
            surplus: 0,
            avatar: 'https://freepngimg.com/thumb/youtube/62644-profile-account-google-icons-computer-user-iconfinder.png',
            role: {
                id: 2,
            },
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
                .min(8, 'T??n c???a b???n t???i thi???u l?? 8 k?? t???!')
                .max(20, 'T??n c???a b???n t???i ??a l?? 20 k?? t???!')
                .required('Vui l??ng nh???p h??? v?? t??n ?????y ?????!'),
            username: yup
                .string()
                .min(8, 'T??n ????ng nh???p t???i thi???u l?? 8 k?? t???!')
                .max(20, 'T??n ????ng nh???p t???i ??a l?? 20 k?? t???!')
                .required('Vui l??ng nh???p t??n ????ng nh???p!'),
            email: yup.string().email('Vui l??ng nh???p ????ng ?????nh d???ng email!').required('Vui l??ng nh???p ?????a ch??? email!'),
            phone: yup.string().required('Vui l??ng nh???p s??? ??i???n tho???i!'),
            password: yup
                .string()
                .min(8, 'M???t Kh???u ??t nh???t l?? 8 k?? t???!')
                .max(20, 'M???t kh???u t???i ??a l?? 20 k?? t???!')
                .required('Vui l??ng nh???p m???t kh???u!'),
            repassword: yup
                .string()
                .oneOf([yup.ref('password')], 'M???t kh???u ph???i tr??ng nhau!')
                .required('Vui l??ng nh???p l???i m???t kh???u!'),
            surplus: yup.number('B???n ph???i nh???p s???!').moreThan(49000, 'Vui l??ng nh???p s??? l??n h??n 50.000!'),
            locationRegion: yup.object().shape({ provinceId: yup.string().required('Vui l??ng ch???n T???nh Th??nh ph???!') }),
            locationRegion: yup.object().shape({ districtId: yup.string().required('Vui l??ng ch???n Qu???n / huy???n!') }),
            locationRegion: yup.object().shape({ wardId: yup.string().required('Vui l??ng ch???n Th??n / x??!') }),
            locationRegion: yup.object().shape({ address: yup.string().required('Vui l??ng nh???p ?????a ch???!') }),
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

            account.avatar = img;
            account.locationRegion.provinceId = provinceId;
            account.locationRegion.provinceName = currentProvince;
            account.locationRegion.districtId = districtId;
            account.locationRegion.districtName = currentDistrict;
            account.locationRegion.wardId = wardId;
            account.locationRegion.wardName = currentWard;
            flag = true;
            setAccountFrm(account);
            handleReset();
        },
    });
    return (
        <>
            <form className="alo" onSubmit={formik.handleSubmit} onReset={formik.handleReset}>
                <div className="base-width-reg main-yield" style={{ maxWidth: '96%' }}>
                    <h3 style={{ color: 'yellow', textAlign: 'center', paddingTop: '50px' }}>
                        ????NG K?? TH??NG TIN T??I KHO???N
                    </h3>
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
                                {formik.errors.username && formik.errors.username && (
                                    <li className="error">{formik.errors.username}</li>
                                )}
                                {formik.errors.surplus && formik.errors.surplus && (
                                    <li className="error">{formik.errors.surplus}</li>
                                )}
                            </ul>
                        </div>
                        <div className="row">
                            <div className="mb-2 col-4">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    T??n ????ng nh???p:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    id="username"
                                    placeholder="Vui l??ng nh???p t??n ????ng nh???p..."
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addTitle" className="form-label text-dark font-weight-bold ml-2">
                                    T??n ?????y ?????:
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    id="fullName"
                                    placeholder="Vui l??ng nh???p h??? v?? t??n..."
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
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
                                    placeholder="Vui l??ng nh???p Email..."
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-2 col-4">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    M???t kh???u:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    id="password"
                                    placeholder="Vui l??ng nh???p m???t kh???u..."
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addPrice" className="form-label text-dark font-weight-bold ml-2">
                                    Nh???p l???i m???t kh???u:
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="repassword"
                                    id="repassword"
                                    placeholder="Vui l??ng nh???p l???i m???t kh???u..."
                                    value={formik.values.repassword}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addAvailable" className="form-label text-dark font-weight-bold ml-2">
                                    S??? ??i???n tho???i:
                                </label>
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    name="phone"
                                    placeholder="Vui l??ng nh???p s??? ??i???n tho???i..."
                                    value={formik.values.phone}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <div className="row mb-2 ">
                            <div className="col-4">
                                <label htmlFor="addAction" className="form-label text-dark font-weight-bold ml-2">
                                    Th??nh ph??? / T???nh:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="province"
                                    name="locationRegion.provinceId"
                                    onInput={handleProvince}
                                >
                                    {provinces && (
                                        <option value={-1} key={-1} selected disabled>
                                            Ch???n
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
                                    Qu???n / Huy???n:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="district"
                                    name="locationRegion.districtId"
                                    onInput={handleDistrict}
                                >
                                    {districts ? (
                                        ''
                                    ) : (
                                        <option value={-1} key={-1} defaultValue disabled>
                                            Ch???n t???nh / Th??nh ph???:
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
                                    Ph?????ng / X??:
                                </label>
                                <select
                                    className="form-select select select-bg-ori"
                                    id="ward"
                                    name="locationRegion.wardId "
                                    onInput={handleWard}
                                >
                                    {wards ? (
                                        ''
                                    ) : (
                                        <option value={-1} key={-1} defaultValue disabled>
                                            Ch???n t???nh / Th??nh ph???:
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
                            <div className="mb-2 col-4">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    ???nh:
                                </label>
                                <input
                                    type="file"
                                    className="form-control"
                                    multiple="multiple"
                                    accept="image/*"
                                    id="image"
                                    name="avatar"
                                    placeholder="Vui l??ng ch???n file..."
                                    onInput={handleUpload}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    ?????a ch???:
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    name="locationRegion.address"
                                    placeholder="Vui l??ng nh???p ?????a ch???..."
                                    value={formik.values.address}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className="mb-2 col-4">
                                <label htmlFor="addImage" className="form-label text-dark font-weight-bold ml-2">
                                    N???p ti???n:
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="surplus"
                                    name="surplus"
                                    placeholder="Vui l??ng nh???p s??? ti???n mu???n n???p..."
                                    value={formik.values.surplus}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="signinBtn btn btn-primary"
                            style={{ display: 'block', margin: '0 auto', textAlign: 'center' }}
                        >
                            ????NG K??
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </>
    );
};

export default ContenRegister;
