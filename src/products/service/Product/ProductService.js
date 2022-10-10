import axios from "axios";
import { ALL_PRODUCT } from './../API';

class ProductService{
    static getAllProducts(){
        return axios.get(ALL_PRODUCT);
    }
}

export default ProductService;