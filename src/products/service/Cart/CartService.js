import axios from "axios";
import { CREATE_CART } from './../API';

class CartService{
    static createCart(){
        return axios.post(CREATE_CART);
    }
}

export default CartService;