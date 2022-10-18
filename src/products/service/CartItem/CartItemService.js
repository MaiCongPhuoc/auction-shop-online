import axios from "axios";
import { ADD_CART_ITEM } from './../API';

class CartItemService{
    static addCartItem(accountId, cartItem){
        return axios.post(`${ADD_CART_ITEM}/${accountId}`, cartItem);
    }
}

export default CartItemService;