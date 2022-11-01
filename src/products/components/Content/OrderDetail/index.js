import React from "react";
import Header from './../../Header/Header';
import { Provider } from "react-redux";
import store from "../../../redux/store";
import OrderDetail from './OrderDetail';

function ShowOrderDetail() {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <OrderDetail />
        </Provider>
    );
}

export default ShowOrderDetail;