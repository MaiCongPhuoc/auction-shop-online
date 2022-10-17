import axios from "axios";
import { ALL_MEDIA_PRODUCT, ALL_PRODUCTS } from './../API';

class ProductService{
    static getAllProducts(){
        return axios.get(ALL_PRODUCTS);
    }

    static getProductById(id){
        return axios.get(`${ALL_PRODUCTS}/${id}`);
    }

    static getAllMediaByProductId(productId) {
        return axios.get(`${ALL_MEDIA_PRODUCT}/${productId}`);
    }
}

export default ProductService;