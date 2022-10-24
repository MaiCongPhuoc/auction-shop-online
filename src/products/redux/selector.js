import { createSelector } from 'reselect';
//login
export const getLoginStatus = (state) => state.login.login;

// account
export const getAccount = (state) => state.account.account;


// types
export const getType = (state) => state.types.type;

export const getTypes = (state) => state.types.lotTypes;

// products
export const getAllProducts = (state) => state.products.products;

export const getProduct = (state) => state.products.product;

export const getCheckProduct = (state) => state.products.checkProduct;

export const getIdProduct = (state) => state.products.idProduct;

// categories
export const getAllCategories = (state) => state.categories.categories;

export const getLoadData = (state) => state.products.loadData;

// cart items
export const getAllCartItems = (state) => state.cartItems.cartItems;

export const getShowCart = (state) => state.cartItems.showCart;

export const getShowModalCheckout = (state) => state.cartItems.showCheckout;

// Filters
export const searchTextSelector = (state) => state.filters.search;

export const getResultsFiltersChange = (state) => state.filters.results;

export const getSearchingFilters = (state) => state.filters.searching;

export const getTypeFiltersChange = (state) => state.filters.type;

export const getCategoriesFiltersChange = (state) => state.filters.categories;

export const getShowResultNav = (state) => state.filters.showResultNav;



export const getProductsAction = createSelector(
    getAllProducts,
    getType,
    (products, type) => {
        if (type === 'Đấu giá') {
            return products.filter((product) => {
                console.log('selector auction: ', product);
                return product.action === true;
            });
        }
        if (type === 'Cửa hàng') {
            return products.filter((product) => {
                return product.action === false;
            });
        }
    }
);


export const productsRemainingSelector = createSelector(
    getAllProducts,
    searchTextSelector,
    (products, searchText) => {
        return products.filter((product) => {
            return product.title.toLowerCase().includes(searchText.trim().toLowerCase());
        });
    });

export const productsRemainingTypeSelector = createSelector(
    productsRemainingSelector,
    getTypeFiltersChange,
    (products, typeChange) => {
        if (typeChange === 'Tất cả') {
            return products;
        }
        else if (typeChange === 'Đấu giá') {
            return products.filter((product) => {
                return product.action === true;
            });
        }
        else if (typeChange === 'Cửa hàng') {
            return products.filter((product) => {
                return product.action === false;
            });
        }
        else {
            return products;
        }
    }
)

export const productsRemainingCategorySelector = createSelector(
    productsRemainingTypeSelector,
    getCategoriesFiltersChange,
    (products, categories) => {
        if (categories.length <= 0) {
            return products;
        }
        else {
            return products.filter((product) => {
                return categories.includes(product.category.title);
            });
        }
    });
    
// Modals

export const getShowInfoProduct = (state) => state.modals.showInfoProduct;

export const getShowAddProduct = (state) => state.modals.showAddProduct;

export const getShowEditProduct = (state) => state.modals.showEditProduct;

export const getShowModerationProduct = (state) => state.modals.showModerationProduct;


