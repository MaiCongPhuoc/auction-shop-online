import axios from 'axios';
import { toast } from 'react-toastify';
import { LOGIN_URL, REGISTER_URL } from './Commom';

class AuthService {

    static getCookie(name) {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    }

    static postRegister(user) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${REGISTER_URL}`, user);
    }
    static postLogin(user) {
        let cookie = this.getCookie('JWT');
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookie}`;
        return axios.post(`${LOGIN_URL}`, user).catch((error) => {
            toast.error(error.response.data.exceptionMessage);
        });
    }
}

export default AuthService;
