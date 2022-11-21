import { Provider } from 'react-redux';
import Header from '../products/components/Header/Header';
import store from '../products/redux/store';
import ContentAuctionDetail from './ContentAuction';
import './assets/style.css';

function Auction() {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <ContentAuctionDetail />
        </Provider>
    );
}

export default Auction;
