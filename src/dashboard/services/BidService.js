import axios from "axios";
import { BID_URL, LISTBID_URL } from "./Commom";

class BidService{
    static getBidByAuctionId(auctionId){
        return axios.get(`${LISTBID_URL}/${auctionId}`)
    }
    static postCreateBid(Bid){
        return axios.post(BID_URL, Bid)
    }
}

export default BidService;