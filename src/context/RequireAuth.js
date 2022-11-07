import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import useAuth from '../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { getAccount } from '../products/redux/selector';
import { loginStatus, setAccount } from '../products/redux/actions';
import AccountService from '../dashboard/services/AccountService';

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
        async function getAccoun() {
            let account = await AccountService.getEmail(decoded.sub);
            dispatch(loginStatus(true));
            dispatch(setAccount(account.data));
        }
        getAccoun();
    }

    const location = useLocation();
    return (
        decoded.role.find((role) => allowedRoles?.includes(role.authority)) ? (
            <Outlet />
        ) : (
            <Navigate to="/unauthorized" state={{ from: location }} replace />
        )
    );
};
export default RequireAuth;
