import axios from "axios";
import { ADD_CART_ITEM, ALL_CART_ITEM } from './../API';

class CartItemService{
    static addCartItem(accountId, cartItem){
        return axios.post(`${ADD_CART_ITEM}/${accountId}`, cartItem);
    };

    static getCartItems(accountId){
        return axios.get(`${ALL_CART_ITEM}/${accountId}`);
    };

}

export default CartItemService;