import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import LocationService from '../products/service/LocationService/LocationService';
import { getAccount } from '../products/redux/selector';

const AccountLocation = () => {

    const [state, setState] = useState({
        accounts: {
            username: '',
            fullName: '',
            password: '',
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
        },
        provinces: [],
        districts: [],
        wards: [],
        province_id: null,
        district_id: null,
        ward_id: null,
        errorMessage: '',
    });
    const account = useSelector(getAccount);

    useEffect(() => {
        try {
            async function getLocationRegion() {
                let provinceRes = await LocationService.getProvinces();
                let districtRes = await LocationService.getDistricts(
                    state.accounts.locationRegion.provinceId ?? account.locationRegion.provinceId,
                );
                let wardRes = await LocationService.getWards(
                    state.accounts.locationRegion.districtId ?? account.locationRegion.districtId,
                );
                setState({
                    ...state,
                    accounts: {
                        ...state.accounts,
                        username: account.username,
                        fullName: account.fullName,
                        password: account.password,
                        phone: account.phone,
                        email: account.email,
                        avatar: account.avatar,
                        locationRegion: {
                            provinceId: state.accounts.locationRegion.provinceId ?? account.locationRegion.provinceId,
                            provinceName:
                                state.accounts.locationRegion.provinceName ?? account.locationRegion.provinceName,
                            districtId: state.accounts.locationRegion.districtId ?? account.locationRegion.districtId,
                            districtName:
                                state.accounts.locationRegion.districtName ?? account.locationRegion.districtName,
                            wardId: state.accounts.locationRegion.wardId ?? account.locationRegion.wardId,
                            wardName: state.accounts.locationRegion.wardName ?? account.locationRegion.wardName,
                            address: state.accounts.locationRegion.address ?? account.locationRegion.address,
                        },
                    },
                    provinces: provinceRes.data.results,
                    districts: districtRes.data.results,
                    wards: wardRes.data.results,
                    province_id: account.locationRegion.provinceId,
                });
            }
            getLocationRegion();
        } catch (error) {
            console.log(error);
        }
    }, [state.province_id, state.district_id]);
    return (
        <div>
            <div className="OnBoarder-module__progressionSteps___3uURC">
                <div className="Card-module__card___edZpg">
                    <div className="SignUp-module__wrapperOnBoarder___1cxLB profile-step">
                        <h2 className="H2-module__h2___n7HMh">????ng k?? v??? tr??</h2>
                        <p className="P-module__p___fx52B"></p>
                        <div className="SignUp-module__wrapperInnerOnBoarder___1evtQ">
                            <form action="">
                                T???nh / Th??nh ph???
                                <select name="" id="" className="Input-module__input___r_xts email-primary">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                                Qu???n / Huy???n
                                <select name="" id="" className="Input-module__input___r_xts email-primary">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                                Th??? Tr???n / X??
                                <select name="" id="" className="Input-module__input___r_xts email-primary">
                                    <option value="">1</option>
                                    <option value="">2</option>
                                    <option value="">3</option>
                                </select>
                                ?????a ch???{' '}
                                <input
                                    className="Input-module__input___r_xts email-primary"
                                    id="react-unique-id-0"
                                    type="text"
                                    value=""
                                    placeholder="?????a ch???"
                                />
                                <div className="Button-module__div___2L21a">
                                    <button
                                        className="Button-module__button____spOe Button-module__disabled___2wmxS"
                                        type="submit"
                                        data-testid="next"
                                    >
                                        <span>????ng k??</span>
                                    </button>{' '}
                                    |
                                    <button
                                        className="Button-module__button____spOe Button-module__disabled___2wmxS"
                                        type="submit"
                                        data-testid="back"
                                    >
                                        <span> Quay l???i</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountLocation;
