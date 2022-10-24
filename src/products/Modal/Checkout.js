import React, { useEffect, useState } from "react";
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, getShowModalCheckout } from "../redux/selector";
import { setShowCartModalCheckout } from './../redux/actions';
import { FormatMoney } from './../Hooks/Hooks';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import LocationService from './../service/LocationService/LocationService';

const Checkout = ({ items }) => {

    const dispatch = useDispatch();

    const account = useSelector(getAccount);

    const [state, setState] = useState({
        orders: {
            fullName: '',
            phone: '',
            email: '',
            locationRegion: {
                id: 0,
                provinceId: '',
                provinceName: '',
                districtId: '',
                districtName: '',
                wardId: '',
                wardName: '',
                address: ''
            },
            description: ''
        },
        provinces: [],
        districts: [],
        wards: [],
        province_id: '',
        district_id: '',
        ward_id: '',
        errorMessage: ''
    });

    const addresses = ["provinceId", "districtId", "wardId"]

    useEffect(() => {
        try {
            async function getLocationRegion() {
                let provinceRes = await LocationService.getProvinces();
                let districtRes = await LocationService.getDistricts(account.locationRegion.provinceId);
                let wardRes = await LocationService.getWards(account.locationRegion.districtId);

                setState({
                    ...state,
                    orders: {
                        ...state.orders,
                        fullName: account.fullName,
                        phone: account.phone,
                        email: account.email,
                        locationRegion: {
                            id: 3,
                            provinceId: '45',
                            provinceName: 'Tỉnh Quảng Trị',
                            districtId: '468',
                            districtName: 'Huyện Cam Lộ',
                            wardId: '19597',
                            wardName: 'Thị trấn Cam Lộ',
                            address: 'Voluptas fugit dolo'
                        },
                    },
                    provinces: provinceRes.data.results,
                    districts: districtRes.data.results,
                    wards: wardRes.data.results,
                    province_id: account.locationRegion.provinceId,
                });
            };
            getLocationRegion();
        } catch (error) {
            console.log(error);
        }
    }, []);


    const handleClose = () => {
        dispatch(setShowCartModalCheckout(false))
    };
    const showModalCheckout = useSelector(getShowModalCheckout);

    const handleInputValue = (e) => {
        setState({
            ...state,
            orders: {
                [e.target.name]: e.target.value
            }
        })
    };

    const handleOnChangeSelect = (e) => {
        if (e.target.name === "provinceId") {
            state.provinces.forEach(province => {
                if (province.province_id === e.target.value) {
                    setState({
                        ...state,
                        orders: {
                            ...state.orders,
                            locationRegion: {
                                ...state.orders.locationRegion,
                                [e.target.name]: e.target.value,
                                provinceName: province.province_name
                            }
                        }
                    })
                }
            });
        } else if (e.target.name === "districtId") {
            state.districts.forEach(district => {
                if (district.district_id === e.target.value) {
                    setState({
                        ...state,
                        orders: {
                            ...state.orders,
                            locationRegion: {
                                ...state.orders.locationRegion,
                                [e.target.name]: e.target.value,
                                districtName: district.district_name
                            }
                        }
                    })
                }
            });
        } else if (e.target.name === "wardId") {
            state.wards.forEach(ward => {
                if (ward.ward_id === e.target.value) {
                    setState({
                        ...state,
                        orders: {
                            ...state.orders,
                            locationRegion: {
                                ...state.orders.locationRegion,
                                [e.target.name]: e.target.value,
                                wardName: ward.ward_name
                            }
                        }
                    })
                }
            });
        }
    };

    console.log(state.orders.locationRegion);
    return (
        <>
            <Modal
                size="xl"
                show={showModalCheckout}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton style={{ backgroundColor: '#004cbc' }}>
                    <Modal.Title style={{ color: '#fff' }}>Hoàn tất thông tin để mua hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body className="show-checkout-modal" style={{ backgroundColor: '#f2f2f2' }}>
                    <Container>
                        <Row>

                            <Col xs={12} md={12}>
                                <div className="row mx-2 my-2">
                                    <b>Thông tin người nhận</b>
                                </div>
                                <div className="row ms-1" style={{ backgroundColor: '#fff', boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)' }}>
                                    <div className="row-info-recipient">
                                        <label htmlFor="fullNameRecipient" className="col-4 labelRecipient">Họ và tên: </label>
                                        <label htmlFor="phoneRecipient" className="col-4 labelRecipient">Số điện thoại: </label>
                                        <label htmlFor="emailRecipient" className="col-4 labelRecipient">Email: </label>
                                    </div>
                                    <div className="row-info-recipient" style={{ justifyContent: 'space-around' }}>
                                        <input onChange={handleInputValue} type="text" name="fullName" className="info-input form-control col-4" id="fullNameRecipient" style={{ margin: '0', borderRadius: '5px' }} value={state.orders.fullName} />
                                        <input onChange={handleInputValue} type="tel" name="phone" className="info-input form-control col-4" id="phoneRecipient" style={{ margin: '0', borderRadius: '5px' }} value={state.orders.phone} />
                                        <input onChange={handleInputValue} type="email" name="email" className="info-input form-control col-4" id="emailRecipient" style={{ margin: '0', borderRadius: '5px' }} value={state.orders.email} />
                                    </div>

                                    <div className="row-info-recipient mt-4" style={{ justifyContent: 'space-around' }}>
                                        <div className="col-3" style={{ padding: '0' }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="province-simple-select-label">Chọn Tỉnh/Thành phố</InputLabel>
                                                <Select
                                                    className="col-12"
                                                    labelId="province-simple-select-label"
                                                    id="province-simple-select"
                                                    value={state.orders.locationRegion.provinceId}
                                                    label="Chọn Tỉnh/Thành phố"
                                                    name={addresses[0]}
                                                    onChange={handleOnChangeSelect}
                                                >
                                                    {state.provinces.map((province) => (
                                                        <MenuItem value={province.province_id} key={province.province_id}>
                                                            <span style={{ fontSize: '16px' }}>{province.province_name}</span>
                                                        </MenuItem>
                                                    ))}

                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-3" style={{ padding: '0' }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="district-simple-select-label">Chọn Quận/Huyện</InputLabel>
                                                <Select
                                                    className="col-12"
                                                    labelId="district-simple-select-label"
                                                    id="district-simple-select"
                                                    value={state.orders.locationRegion.districtId}
                                                    label="Chọn Quận/Huyện"
                                                    name={addresses[1]}
                                                    onChange={handleOnChangeSelect}
                                                >
                                                    {state.districts.map((district) => (
                                                        <MenuItem value={district.district_id} key={district.district_id}>
                                                            <span style={{ fontSize: '16px' }}>{district.district_name}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-3" style={{ padding: '0' }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="ward-simple-select-label">Chọn Phường/Xã</InputLabel>
                                                <Select
                                                    className="col-12"
                                                    labelId="ward-simple-select-label"
                                                    id="ward-simple-select"
                                                    value={state.orders.locationRegion.wardId}
                                                    label="Chọn Phường/Xã"
                                                    name={addresses[2]}
                                                    onChange={handleOnChangeSelect}
                                                >
                                                    {state.wards.map((ward) => (
                                                        <MenuItem value={ward.ward_id} key={ward.ward_id}>
                                                            <span style={{ fontSize: '16px' }}>{ward.ward_name}</span>
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className="col-3" style={{ padding: '0' }}>
                                            <label htmlFor="emailRecipient" className="col-4 labelRecipient">Địa chỉ cụ thể: </label>
                                            <input type="text" className="form-control col-8" id="emailRecipient" style={{ margin: '0', borderRadius: '5px' }} value={account.locationRegion.address} />
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12} md={12}>
                                <div className="items-checkout row mx-2 my-2">
                                    <b>Danh sách sản phẩm</b>
                                </div>
                                <div className="row mt-2" style={{ display: 'flex', alignItems: 'center', height: '80px', backgroundColor: '#fff', boxShadow: '0px 2px 45px 0px rgba(0, 0, 0, 0.156)' }}>
                                    <div className="item-info text-center col-7">Sản phẩm</div>


                                    <div className="item-info text-center col-2">Số lượng mua</div>


                                    <div className="item-info text-center col-3">Thành tiền</div>
                                </div>
                                {items.map((item => (
                                    <div className="row items-checkout-info my-2" key={item.id}>

                                        <div className="col-7" style={{ display: 'flex', alignItems: 'center' }}>
                                            <div className="col-3">
                                                <img className="item-info-image" src={item.product.image} alt="" />
                                            </div>
                                            <div className="col-9">
                                                <div>{item.product.title}</div>
                                                <div>{item.product.description}</div>
                                                <div className="item-category">{item.product.category.title}</div>
                                                <div className="fw-bold">{FormatMoney(item.product.price)} ₫</div>
                                            </div>
                                        </div>


                                        <div className="col-2 text-center">{item.quantity}</div>


                                        <div className="col-3 text-end">{FormatMoney(item.amountTransaction)} ₫</div>

                                    </div>
                                )))}
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{ width: 100 }} variant="secondary" onClick={handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default Checkout;