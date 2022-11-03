import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getAccount } from '../products/redux/selector';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const account = useSelector(getAccount);
    console.log('account: ', account);
    console.log('allowedRoles: ', allowedRoles);
    console.log(
        'auth?.roles?.find(role => allowedRoles?.includes(role)) :',
        auth?.roles?.find((role) => allowedRoles?.includes(role.authority)),
    );

    const getCookie = (name) => {
        let cookie = {};
        document.cookie.split(';').forEach(function (el) {
            let [k, v] = el.split('=');
            cookie[k.trim()] = v;
        });
        return cookie[name];
    };
    let cookie = getCookie('JWT');
    console.log('cookie: ', cookie);
    let url = window.location.href;
    return account?.roles?.find((role) => allowedRoles?.includes(role.authority)) ? (
        <Outlet />
    ) : account ? (
        <Navigate to="/login" state={{ from: location }} replace />
    ) : (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
};

export default RequireAuth;
