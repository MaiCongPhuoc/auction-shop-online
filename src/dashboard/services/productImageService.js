import axios from 'axios';
import { LISTPRODUCTIMAGE_URL, PRODUCTIMAGE_URL } from './commom';

class ProductMediaService {
    static getListMedia(idProductMedia) {
        return axios.get(`${LISTPRODUCTIMAGE_URL}/` + idProductMedia);
    }
    static AddMedia(img) {
        return axios.post(PRODUCTIMAGE_URL, img);
    }
}

export default ProductMediaService;