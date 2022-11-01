import axios from "axios";
import { ADD_WATCH_LISTS } from "../API";

class WatchListsService{
    static addWatchList(accountId, product){
        return axios.post(`${ADD_WATCH_LISTS}/${accountId}`, product);
    }
    // static getAllOrdersDetail(accountEmail){
    //     return axios.get(`${ALL_ORDERS_DETAIL}/${accountEmail}`);
    // }

}

export default WatchListsService;