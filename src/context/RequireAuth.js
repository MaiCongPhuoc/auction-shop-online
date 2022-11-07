import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { getAccount } from '../products/redux/selector';
import { loginStatus, setAccount } from '../products/redux/actions';
import { toast } from 'react-toastify';
import axios from 'axios';

const RequireAuth = ({ allowedRoles }) => {
    const dispatch = useDispatch();
    const getCookie = (name) => {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    };
    const token = getCookie('JWT');
    const decoded = jwt_decode(token);
    const account = useSelector(getAccount);
    console.log('account: ', account);
    if (Object.keys(account).length === 0) {
        console.log('decoded: ', decoded);
        async function checktEmail() {
            await axios
                .get('http://localhost:8080/api/accounts/getAccountEmail/' + decoded.sub)
                .then((res) => {
                    // toast.success('Kiểm tra email thành công');
                    // document.querySelector('#email').disabled = true;
                    dispatch(loginStatus(true));
                    dispatch(setAccount(res.data));
                })
                .catch((error) => {
                    toast.error('error: ', error);
                });
        }
        checktEmail();
    }

    const location = useLocation();
    return decoded.role.find((role) => allowedRoles?.includes(role.authority)) ? (
        <Outlet />
    ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};
export default RequireAuth;
