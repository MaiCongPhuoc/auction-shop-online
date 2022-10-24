import axios from 'axios';
import { CATEGORY_URL, DATATABLE_CATEGORY_URL, ADD_CATEGORIES, EDIT_CATEGORIES, DELETE_CATEGORIES } from './Commom';

class CategoryService {
    static getCategory() {
        return axios.get(CATEGORY_URL);
    }
    static getDataTableCategory(search, currentPage, recordPerPage) {
        return axios.get(`${DATATABLE_CATEGORY_URL}${search}?page=${currentPage}&size=${recordPerPage}`);
    }
    static addCategory(category) {
        return axios.post(`${ADD_CATEGORIES}`, category);
    }
    static editCategory(editCategory, editCategoryId) {
        return axios.put(`${EDIT_CATEGORIES}/${editCategoryId}`, editCategory);
    }
    static deleteCategory(productId) {
        return axios.put(`${DELETE_CATEGORIES}/${productId}`);
    }
}

export default CategoryService;
