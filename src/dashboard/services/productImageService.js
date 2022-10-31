import axios from 'axios';
import { DELETEPRODUCTIMAGE_URL, LISTPRODUCTIMAGE_URL, PRODUCTIMAGE_URL } from './Commom';

class ProductMediaService {
    static getListMedia(idProductMedia) {
        return axios.get(`${LISTPRODUCTIMAGE_URL}/${idProductMedia}`);
    }
    static AddMedia(img) {
        return axios.post(PRODUCTIMAGE_URL, img);
    }
    static DeleteMedia(idProductMedia) {
        return axios.delete(`${DELETEPRODUCTIMAGE_URL}/${idProductMedia}`);
    }
}

export default ProductMediaService;