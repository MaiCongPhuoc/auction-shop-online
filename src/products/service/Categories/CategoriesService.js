import axios from "axios";
import { ALL_CATEGORIES } from './../API';

class CategoriesService{
    static getAllCategories(){
        return axios.get(ALL_CATEGORIES);
    }
}

export default CategoriesService;