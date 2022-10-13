import axios from 'axios';
import { ADDPRODUCT_URL, EDITPRODUCT_URL, PRODUCTBYID_URL, PRODUCT_URL } from './commom';

class ProductService {
    static getProducts() {
        return axios.get(PRODUCT_URL);
    }
    static AddProduct(product) {
        return axios.post(ADDPRODUCT_URL, product);
    }
    static EditProduct(editProduct, editProductId) {
        return axios.put(`${EDITPRODUCT_URL}/${editProduct}`, editProductId);
    }
    static ProductById(editProductId) {
        return axios.get(`${PRODUCTBYID_URL}/`+ editProductId);
    }
}

export default ProductService;
