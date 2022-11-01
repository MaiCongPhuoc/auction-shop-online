import axios from "axios";
import { CREATE_ORDER_DETAIL } from "../API";
import { ALL_ORDER_DETAIL_BY_EMAIL } from './../API';

class OrdersDetailService{
    static createOrdersDetail(orderId, ordersDetail){
        return axios.post(`${CREATE_ORDER_DETAIL}/${orderId}`, ordersDetail);
    }
    static getAllOrdersDetail(accountEmail){
        return axios.get(`${ALL_ORDER_DETAIL_BY_EMAIL}/${accountEmail}`);
    }

}

export default OrdersDetailService;