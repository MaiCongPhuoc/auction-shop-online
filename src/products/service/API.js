// Products
export const ALL_PRODUCTS = 'http://localhost:8080/api/products';
export const GET_PRODUCTS_BY_SLUG = ALL_PRODUCTS + '/find-by-slug';
export const GET_PRODUCTS_AUCTIONS = ALL_PRODUCTS + '/auctions';
export const GET_PRODUCTS_THE_SHOPS = ALL_PRODUCTS + '/the-shops';

// Product Media
export const ALL_MEDIA_PRODUCT = 'http://localhost:8080/api/productmedia';

// Category
export const ALL_CATEGORIES = 'http://localhost:8080/api/categories';

// Cart
export const GET_CART_BY_ACCOUNT_ID = 'http://localhost:8080/api/cart-items';

// Cart-item
export const ALL_CART_ITEM = 'http://localhost:8080/api/cart-items';
export const ALL_CART_ITEM_BY_CART_ID = ALL_CART_ITEM + '/get-by-cart-id';
export const ADD_CART_ITEM = ALL_CART_ITEM + '/create';
export const REDUCE_CART_ITEM = ALL_CART_ITEM + '/reduce';
export const INCREASING_CART_ITEM = ALL_CART_ITEM + '/increasing';
export const REMOVE_CART_ITEM = ALL_CART_ITEM + '/remove';
export const REMOVE_CART_ITEMS = ALL_CART_ITEM + '/remove-list';

// Location Region
export const ALL_PROVINCE_URL = 'https://vapi.vnappmob.com/api/province';
export const ALL_DISTRICT_URL = ALL_PROVINCE_URL + '/district';
export const ALL_WARD_URL = ALL_PROVINCE_URL + '/ward';

// Order
export const ALL_ORDERS = 'http://localhost:8080/api/orders';
export const CHECKOUT_ORDER = ALL_ORDERS + '/checkout';
export const REMOVE_ORDER = ALL_ORDERS + '/remove-order';

// Orders Detail
export const ALL_ORDERS_DETAIL = 'http://localhost:8080/api/orders-detail';
export const CREATE_ORDER_DETAIL = ALL_ORDERS_DETAIL + '/create';

// Login
export const ACCOUNT_LOGIN_URL = 'http://localhost:8080/api/auth/login';
