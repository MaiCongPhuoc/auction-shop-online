import axios from "axios";
import { MODERATION_BY_PRODUCT_ID_URL } from "./Commom";

class AuctionService{
    static getAuctionById(idAuction){
        return axios.get(`${MODERATION_BY_PRODUCT_ID_URL}/${idAuction}`)
    }
}

export default AuctionService;