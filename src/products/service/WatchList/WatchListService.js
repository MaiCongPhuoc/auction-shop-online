import axios from "axios";
import { ADD_WATCH_LISTS, WATCH_LISTS } from "../API";
import { CHECK_WATCH_LISTS } from './../API';

class WatchListsService{
    static addWatchList(accountId, product){
        return axios.post(`${ADD_WATCH_LISTS}/${accountId}`, product);
    }
    static getWatchListByAccountId(accountId){
        return axios.get(`${WATCH_LISTS}/${accountId}`);
    }
    static checkProductInWatchListByAccountId(accountId, product){
        return axios.post(`${CHECK_WATCH_LISTS}/${accountId}`, product);
    }

}

export default WatchListsService;