import axios from "axios";
import { CHECKOUT_ORDER } from './../API';

class OrderService{
    static createCheckoutOrder(accountId, order){
        return axios.post(`${CHECKOUT_ORDER}/${accountId}`, order);
    }
}

export default OrderService;