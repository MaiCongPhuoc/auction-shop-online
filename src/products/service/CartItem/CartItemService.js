import axios from "axios";
import { ADD_CART_ITEM } from './../API';

class CartItemService{
    static createCartItem(accountId){
        return axios.post(`${ADD_CART_ITEM}/${accountId}`);
    }
}

export default CartItemService;