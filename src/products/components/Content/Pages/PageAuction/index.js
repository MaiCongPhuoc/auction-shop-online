import React from "react";
import Header from './../../../Header/Header';
import { Provider } from "react-redux";
import store from "../../../../redux/store";
import PageAuction from './PageAuction';

function ShowPageAuction() {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <PageAuction />
        </Provider>
    );
}

export default ShowPageAuction;