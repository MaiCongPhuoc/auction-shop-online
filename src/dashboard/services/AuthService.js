import axios from "axios";
import { LOGIN_URL, REGISTER_URL } from "./Commom";

class AuthService{
    static postRegister(user){
        return axios.post(`${REGISTER_URL}`, user)
    }
    static postLogin(user){
        return axios.post(`${LOGIN_URL}`, user)
    }
}

export default AuthService;