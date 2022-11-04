import { useSelector } from 'react-redux';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { getAccount } from '../products/redux/selector';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const account = useSelector(getAccount);
    console.log('auth: ', auth);
    console.log('account: ', account);
    console.log('allowedRoles: ', allowedRoles);
    console.log(
        'auth?.roles?.find(role => allowedRoles?.includes(role)) :',
        auth?.roles?.find((role) => allowedRoles?.includes(role.authority)),
    );
    return (
        // auth?.roles?.find(role => allowedRoles?.includes(role.authority))
        // ? <Outlet />
        // : account
        //     ? <Navigate to="/unauthorized" state={{ from: location }} replace />
        //     : <Navigate to="/login" state={{ from: location }} replace />
        <Outlet />
    );
};
export default RequireAuth;
