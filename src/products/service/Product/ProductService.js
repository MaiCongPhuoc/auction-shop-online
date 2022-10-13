import axios from "axios";
import { ALL_PRODUCTS } from './../API';

class ProductService{
    static getAllProducts(){
        return axios.get(ALL_PRODUCTS);
    }

    static getProductById(id){
        return axios.get(`${ALL_PRODUCTS}/${id}`);
    }
}

export default ProductService;