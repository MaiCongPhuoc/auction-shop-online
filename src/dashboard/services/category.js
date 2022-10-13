import axios from "axios";
import { CATEGORY_URL } from './commom';

class CategoryService{
    static getCategory(){
        return axios.get(CATEGORY_URL)
    }
}

export default CategoryService;