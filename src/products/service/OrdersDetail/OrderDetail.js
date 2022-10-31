import axios from "axios";
import { CREATE_ORDER_DETAIL } from "../API";

class OrdersDetailService{
    static createOrdersDetail(orderId, ordersDetail){
        return axios.post(`${CREATE_ORDER_DETAIL}/${orderId}`, ordersDetail);
    }
}

export default OrdersDetailService;