import axios from "axios";
import { PRODUCT_URL } from './commom';

class ProductService{
    static getProducts(){
        return axios.get(PRODUCT_URL)
    }
}

export default ProductService;