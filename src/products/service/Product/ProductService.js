import axios from "axios";
import { ALL_MEDIA_PRODUCT, ALL_PRODUCTS, GET_PRODUCTS_BY_SLUG } from './../API';

class ProductService{
    static getAllProducts(){
        return axios.get(ALL_PRODUCTS);
    }

    static getProductById(id){
        return axios.get(`${ALL_PRODUCTS}/${id}`);
    }

    static getProductBySlug(slug){
        return axios.get(`${GET_PRODUCTS_BY_SLUG}/${slug}`);
    }

    static getAllMediaByProductId(productId) {
        return axios.get(`${ALL_MEDIA_PRODUCT}/${productId}`);
    }
}

export default ProductService;