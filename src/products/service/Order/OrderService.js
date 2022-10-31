import axios from "axios";
import { CHECKOUT_ORDER, REMOVE_ORDER } from './../API';

class OrderService{
    static createCheckoutOrder(accountId, order){
        return axios.post(`${CHECKOUT_ORDER}/${accountId}`, order);
    }
    static removeOrder(orderId){
        return axios.put(`${REMOVE_ORDER}/${orderId}`);
    }
}

export default OrderService;