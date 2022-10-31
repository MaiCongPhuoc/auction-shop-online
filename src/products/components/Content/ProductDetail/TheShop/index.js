import { Provider } from 'react-redux';
// import { useParams } from 'react-router-dom';

import './../../../../asset/css/style.css';
import TheShopDetail from './TheShopDetail';
import Header from './../../../Header/Header';
import store from './../../../../redux/store';

function TheShop() {
    // const { auctionId } = useParams();
    // console.log('auctionId: ', auctionId);
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <TheShopDetail />
        </Provider>
    );
}

export default TheShop;
