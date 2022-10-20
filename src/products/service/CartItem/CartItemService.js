import axios from "axios";
import { ADD_CART_ITEM, ALL_CART_ITEM, REDUCE_CART_ITEM, INCREASING_CART_ITEM } from './../API';

class CartItemService{
    static addCartItem(accountId, cartItem){
        return axios.post(`${ADD_CART_ITEM}/${accountId}`, cartItem);
    };

    static getCartItems(accountId){
        return axios.get(`${ALL_CART_ITEM}/${accountId}`);
    };

    static getReduceCartItem(cartItemId){
        return axios.get(`${REDUCE_CART_ITEM}/${cartItemId}`);
    };

    static getIncreasingCartItem(cartItemId){
        return axios.get(`${INCREASING_CART_ITEM}/${cartItemId}`);
    };

}

export default CartItemService;