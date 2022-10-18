import typesReducer from './../Slice/LotTypesSlice';
import productsReducer from './../Slice/ProductsSlice';
import loginReducer from './../Slice/LoginSlice';
import categoriesReducer from './../Slice/CategorySlice';
import filtersReducer from './../Slice/FiltersSlice';
import modalReducer from './../Slice/ModalSlice';
import accountReducer from './../Slice/AccountSlice';

const rootReducer = (state = {}, action) => {
    return {
        types: typesReducer(state.types, action),
        products: productsReducer(state.products, action),
        login: loginReducer(state.login, action),
        categories: categoriesReducer(state.categories, action),
        filters: filtersReducer(state.filters, action),
        modals: modalReducer(state.modals, action),
        account: accountReducer(state.account, action)
    }   
}

export default rootReducer;