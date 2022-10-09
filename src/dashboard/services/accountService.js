import axios from "axios";
import { ACCOUNT_URL } from './commom';

class AccountService{
    static getAccount(){
        return axios.get(ACCOUNT_URL)
    }
}

export default AccountService;