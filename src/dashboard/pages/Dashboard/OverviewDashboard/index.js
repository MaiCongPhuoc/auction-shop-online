import TurnoverInYear from './TurnoverInYear';
import TurnoverInMonth from './TurnoverInMonth';
import Product from './Product';
import Account from './Account';
import { useState, useEffect, useRef } from 'react';
import productService from '../../../services/productService';
import AccountService from '../../../services/AccountService';

function TongQuanDashboard() {
    let totalAccount = 0;
    let totalProduct = 0;
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
    for (let i = 0; i < accounts.length; i++) {
        totalAccount += 1;
    }
    for (let i = 0; i < products.length; i++) {
        totalProduct += 1;
    }
    return (
        <div className="row dashboard">
            <TurnoverInMonth />

            <TurnoverInYear />

            <Product totalProduct={totalProduct} />

            <Account totalAccount={totalAccount} />
        </div>
    );
}

export default TongQuanDashboard;
