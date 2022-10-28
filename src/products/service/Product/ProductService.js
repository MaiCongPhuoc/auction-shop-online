import axios from "axios";
import { ALL_MEDIA_PRODUCT, ALL_PRODUCTS, GET_PRODUCTS_BY_SLUG, GET_PRODUCTS_AUCTIONS, GET_PRODUCTS_THE_SHOPS } from './../API';

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
    static getAllProductAuctions() {
        return axios.get(GET_PRODUCTS_AUCTIONS);
    }
    static getAllProductTheShops() {
        return axios.get(GET_PRODUCTS_THE_SHOPS);
    }
}

export default ProductService;