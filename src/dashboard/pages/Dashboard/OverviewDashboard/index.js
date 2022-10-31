import TurnoverInYear from './TurnoverInYear';
import TurnoverInMonth from './TurnoverInMonth';
import Product from './Product';
import Account from './Account';
import { useState, useEffect, useRef } from 'react';
import productService from '../../../services/productService';
import AccountService from '../../../services/AccountService';

function TongQuanDashboard() {
    const [state, setState] = useState({
        accounts: [],
        products: [],
    });
    const { accounts, products } = state;

    useEffect(() => {
        async function getdashboard() {
            let product = await productService.getProducts();
            let account = await AccountService.getAccount();
            setState({
                accounts: account.data,
                products: product.data,
            });
        }
        getdashboard();
    }, []);
    return (
        <div className="row dashboard">
            <TurnoverInMonth />

            <TurnoverInYear />

            <Product totalProduct={products.length} />

            <Account totalAccount={accounts.length} />
        </div>
    );
}

export default TongQuanDashboard;
