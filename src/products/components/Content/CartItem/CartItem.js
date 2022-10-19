import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { getAllCartItems } from "../../../redux/selector";

const CartItem = () => {
    const cartItems = useSelector(getAllCartItems);

    return (
        <div>
            <div id="show-list-cart-item">
                <div id="cart">
                    <table className="table" id="tb-cart-item">
                        <thead>
                            <tr>
                                <th className="text-center" id="image-item"> Image</th>
                                <th className="text-center" id="title-item">Title</th>
                                <th className="text-center" id="price-item">Price</th>
                                <th className="text-center" id="quantity-item">Quantity</th>
                                <th className="text-center" id="total-item">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(cartItem => (
                                <tr key={cartItem.id}>
                                    <td>
                                        <img src={cartItem.product.image} alt="" />
                                    </td>
                                    <td>{cartItem.product.title}</td>
                                    <td className="text-end">{cartItem.price}</td>
                                    <td>
                                        <input type="text" />
                                        {cartItem.quantity}
                                    </td>
                                    <td className="text-end">{cartItem.amountTransaction}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h5>Sum: $ total</h5>
                </div>
            </div>
            <template id="product-box" />
            <template id="buy-box" />
        </div>
    );
}

export default CartItem;