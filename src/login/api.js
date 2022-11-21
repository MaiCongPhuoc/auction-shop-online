import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.auctionshop.tk/api/',
    headers: { 'Content-Type': 'application/json' },
});
