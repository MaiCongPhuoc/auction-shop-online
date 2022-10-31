import axios from 'axios';
import {
    ADDPRODUCT_URL,
    DATATABLEPRODUCT_URL,
    EDITPRODUCT_URL,
    PRODUCTBYID_URL,
    PRODUCTMODERATIONBYID_URL,
    PRODUCTMODERATION_URL,
    PRODUCT_URL,
    REMOVEPRODUCT_URL,
} from './Commom';

class ProductService {
    static getProducts() {
        return axios.get(PRODUCT_URL);
    }
    static getProductsModeration() {
        return axios.get(PRODUCTMODERATION_URL);
    }
    static getDataTableProduct(search, currentPage, recordPerPage) {
        return axios.get(`${DATATABLEPRODUCT_URL}${search}?page=${currentPage}&size=${recordPerPage}`);
    }
    static AddProduct(product) {
        return axios.post(`${ADDPRODUCT_URL}`, product);
    }
    static EditProduct(editProduct, editProductId) {
        return axios.put(`${EDITPRODUCT_URL}/${editProductId}`, editProduct);
    }
    static ModerationProduct(editProductId) {
        return axios.put(`${PRODUCTMODERATIONBYID_URL}/${editProductId}`);
    }
    static ProductById(editProductId) {
        return axios.get(`${PRODUCTBYID_URL}/` + editProductId);
    }
    static DeleteProduct(productId) {
        return axios.put(`${REMOVEPRODUCT_URL}/${productId}`);
    }
}

export default ProductService;
