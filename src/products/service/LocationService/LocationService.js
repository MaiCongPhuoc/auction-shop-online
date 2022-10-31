import axios from 'axios';
import { ALL_PROVINCE_URL, ALL_DISTRICT_URL, ALL_WARD_URL } from '../API';

class LocationService{
    static getProvinces() {
        return axios.get(ALL_PROVINCE_URL)
    }
    static getDistricts(provinceId) {
        return axios.get(`${ALL_DISTRICT_URL}/${provinceId}`)
    }
    static getWards(districtId) {
        return axios.get(`${ALL_WARD_URL}/${districtId}`)
    }
}

export default LocationService;