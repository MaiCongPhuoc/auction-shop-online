import typesReducer from './../Slice/LotTypesSlice';
import productsReducer from './../Slice/ProductsSlice';
import loginReducer from './../Slice/LoginSlice';
import categoriesReducer from './../Slice/CategorySlice';
import filtersReducer from './../Slice/FiltersSlice';
import modalReducer from './../Slice/ModalSlice';
import accountReducer from './../Slice/AccountSlice';
import cartItemsReducer from '../Slice/CartItemSlice';
import orderReducer from '../Slice/OrderSlice';
import orderDetailsReducer from '../Slice/OrderDetailSlice';
import watchListsReducer from './../Slice/WatchListSlice';
import myShopsReducer from '../Slice/MyShopSlice';

const rootReducer = (state = {}, action) => {
    return {
        types: typesReducer(state.types, action),
        products: productsReducer(state.products, action),
        login: loginReducer(state.login, action),
        categories: categoriesReducer(state.categories, action),
        filters: filtersReducer(state.filters, action),
        modals: modalReducer(state.modals, action),
        account: accountReducer(state.account, action),
        cartItems: cartItemsReducer(state.cartItems, action),
        orders: orderReducer(state.orders, action),
        orderDetails: orderDetailsReducer(state.orderDetails, action),
        watchLists: watchListsReducer(state.watchLists, action),
        myShops: myShopsReducer(state.myShops, action)
    }   
}

export default rootReducer;

