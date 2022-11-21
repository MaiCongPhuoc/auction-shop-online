// Products
export const ALL_PRODUCTS = 'https://api.auctionshop.tk/api/products';
export const GET_PRODUCTS_BY_SLUG = ALL_PRODUCTS + '/find-by-slug';
export const GET_PRODUCTS_AUCTIONS = ALL_PRODUCTS + '/auctions';
export const GET_PRODUCTS_THE_SHOPS = ALL_PRODUCTS + '/the-shops';
export const GET_PRODUCTS_MODERATED_BY_CREATED_BY = ALL_PRODUCTS + '/get-moderated-by-created-by';
export const GET_TOP_PRODUCTS = 'https://api.auctionshop.tk/api/products/find-by-sold';

// Product Media
export const ALL_MEDIA_PRODUCT = 'https://api.auctionshop.tk/api/productmedia';

// Category
export const ALL_CATEGORIES = 'https://api.auctionshop.tk/api/categories';

// Cart
export const GET_CART_BY_ACCOUNT_ID = 'https://api.auctionshop.tk/api/cart-items';

// Cart-item
export const ALL_CART_ITEM = 'https://api.auctionshop.tk/api/cart-items';
export const ALL_CART_ITEM_BY_CART_ID = ALL_CART_ITEM + '/get-by-cart-id';
export const ADD_CART_ITEM = ALL_CART_ITEM + '/create';
export const REDUCE_CART_ITEM = ALL_CART_ITEM + '/reduce';
export const INCREASING_CART_ITEM = ALL_CART_ITEM + '/increasing';
export const REMOVE_CART_ITEM = ALL_CART_ITEM + '/remove';
export const REMOVE_CART_ITEMS = ALL_CART_ITEM + '/remove-list';

// Location Region
export const ALL_PROVINCE_URL = 'https://vapi.vnappmob.com/api/province/';
export const ALL_DISTRICT_URL = ALL_PROVINCE_URL + 'district';
export const ALL_WARD_URL = ALL_PROVINCE_URL + 'ward';

// Order
export const ALL_ORDERS = 'https://api.auctionshop.tk/api/orders';
export const CHECKOUT_ORDER = ALL_ORDERS + '/checkout';
export const REMOVE_ORDER = ALL_ORDERS + '/remove-order';

// Orders Detail
export const ALL_ORDERS_DETAIL = 'https://api.auctionshop.tk/api/orders-detail';
export const CREATE_ORDER_DETAIL = ALL_ORDERS_DETAIL + '/create';
export const GET_BY_PRODUCT_CREATED_BY = ALL_ORDERS_DETAIL + '/get-by-product-created-by';
export const UPDATE_STATUS = ALL_ORDERS_DETAIL + '/update-status';

// Watch list
export const WATCH_LISTS = 'https://api.auctionshop.tk/api/watch-lists';
export const ADD_WATCH_LISTS = WATCH_LISTS + '/add';
export const CHECK_WATCH_LISTS = WATCH_LISTS + '/check';

// Login
export const ACCOUNT_LOGIN_URL = 'https://api.auctionshop.tk/api/auth/login';

//Reviews
export const REVIEW_ALL_URL = 'https://api.auctionshop.tk/api/reviews';
export const REVIEW_GET_BY_ID_URL = 'https://api.auctionshop.tk/api/reviews';
export const REVIEW_ADD_URL = 'https://api.auctionshop.tk/api/reviews/create';
export const REVIEW_DELETE_URL = 'https://api.auctionshop.tk/api/reviews/delete-soft';
export const REVIEW_EDIT_URL = 'https://api.auctionshop.tk/api/reviews/edit';

// Send Email
export const SEND_EMAIL = 'https://api.auctionshop.tk/api/emails';
export const SEND_EMAIL_AUCTIONS_SUCCESS = SEND_EMAIL + '/auctions-success';
