import React from "react";
import Header from './../../Header/Header';
import { Provider } from "react-redux";
import store from "../../../redux/store";
import OrderDetail from './OrderDetail';
import Footer from './../../Footer/Footer';

function ShowOrderDetail() {
    return (
        <>
            <Header className="product-client" />
            <OrderDetail />
            <Footer />
        </>
    );
}

export default ShowOrderDetail;