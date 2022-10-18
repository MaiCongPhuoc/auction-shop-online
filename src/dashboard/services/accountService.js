import axios from "axios";
import { ACCOUNTBYID_URL, ACCOUNT_URL, ADDACCOUNT_URL, DATATABLEACCOUNT_URL, DELETEACCOUNT_URL, DISTRICT_URL, EDITACCOUNT_URL, PROVINCE_URL, ROLES_URL, WARD_URL } from './Commom';

class AccountService{
    static getAccount(){
        return axios.get(ACCOUNT_URL)
    }
    static getAddAccount(account){
        return axios.post(ADDACCOUNT_URL, account)
    }
    static getDataTableAccount(search,currentPage,recordPerPage) {
        return axios.get(`${DATATABLEACCOUNT_URL}${search}?page=${currentPage}&size=${recordPerPage}`);
    }
    static getAccountById(accountId){
        return axios.get(`${ACCOUNTBYID_URL}/${accountId}`)
    }
    static getEditAccount(account, accountId){
        return axios.put(`${EDITACCOUNT_URL}/${accountId}`, account)
    }
    static getDeleteAccount(accountId){
        return axios.patch(`${DELETEACCOUNT_URL}/${accountId}`)
    }
    static getRoles(){
        return axios.get(ROLES_URL)
    }
    static getProvinces(){
        return axios.get(PROVINCE_URL)
    }
    static getDistrict(idProvince){
        return axios.get(`${DISTRICT_URL}/${idProvince}`)
    }
    static getWard(idDistrict){
        return axios.get(`${WARD_URL}/${idDistrict}`)
    }
}

export default AccountService;