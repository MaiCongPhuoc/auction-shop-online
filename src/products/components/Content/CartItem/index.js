import React from "react";
import CartItem from './CartItem';
import Header from './../../Header/Header';
import { Provider } from "react-redux";
import store from "../../../redux/store";

function ShowCartItem() {
    return (
        <Provider store={store}>
            <Header className="product-client" />
            <CartItem />
        </Provider>
    );
}

export default ShowCartItem;