import axios from 'axios';
import { ACCOUNT_LOGIN_URL } from './../API';

class AcountService {
    static addAccount() {
        return axios.post(ACCOUNT_LOGIN_URL);
    }
}

export default AcountService;
