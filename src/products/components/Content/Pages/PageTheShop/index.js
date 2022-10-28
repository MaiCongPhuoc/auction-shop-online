import React from "react";
import Header from './../../../Header/Header';
import { Provider } from "react-redux";
import store from "../../../../redux/store";
import PageTheShop from './PageTheShop';

function ShowPageTheShop() {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <PageTheShop />
        </Provider>
    );
}

export default ShowPageTheShop;