import axios from "axios";
import { GET_CART_BY_ACCOUNT_ID } from './../API';

class CartService{
    // static createCart(){
    //     return axios.post(CREATE_CART);
    // }
    static getCartByAccountId(accountId){
        return axios.get(`${GET_CART_BY_ACCOUNT_ID}/${accountId}`);
    }


}

export default CartService;