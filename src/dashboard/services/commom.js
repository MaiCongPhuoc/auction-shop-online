const URL = "https://api.auctionshop.tk/"; 
export const PRODUCT_URL = URL + 'api/products';
export const PRODUCTMODERATION_URL = URL + 'api/products/moderation';
export const PRODUCTMODERATIONBYID_URL = URL + 'api/products/moderation';
export const ADDPRODUCT_URL = URL + 'api/products/create';
export const EDITPRODUCT_URL = URL + 'api/products/edit';
export const PRODUCTBYID_URL = URL + 'api/products';
export const DATATABLEPRODUCT_URL = URL + 'api/products/p/';
export const REMOVEPRODUCT_URL = URL + 'api/products/delete-soft';

export const PRODUCTIMAGE_URL = URL + 'api/productmedia/save';
export const LISTPRODUCTIMAGE_URL = URL + 'api/productmedia';
export const DELETEPRODUCTIMAGE_URL = URL + 'api/productmedia/delete';

export const ACCOUNT_URL = URL + 'api/accounts';
export const ADDACCOUNT_URL = URL + 'api/accounts/create';
export const EDITACCOUNT_URL = URL + 'api/accounts/update';
export const DELETEACCOUNT_URL = URL + 'api/accounts/delete';
export const LOCKACCOUNT_URL = URL + 'api/accounts/block';
export const UNLOCKACCOUNT_URL = URL + 'api/accounts/unblock';
export const ACCOUNTBYID_URL = URL + 'api/accounts/getAccount/account';
export const DATATABLEACCOUNT_URL = URL + 'api/accounts/p/';
export const ACCOUNTBYEMAIL_URL = URL + 'api/accounts/getAccountEmail';
export const RESTARTPASSWORD_URL = URL + 'api/accounts/restartPassword';

export const ROLES_URL = URL + 'api/roles';

export const CATEGORY_URL = URL + 'api/categories';

export const PROVINCE_URL = 'https://vapi.vnappmob.com/api/province/';
export const DISTRICT_URL = 'https://vapi.vnappmob.com/api/province/district';
export const WARD_URL = 'https://vapi.vnappmob.com/api/province/ward';
export const ADD_CATEGORIES = CATEGORY_URL + '/create';
export const EDIT_CATEGORIES = CATEGORY_URL + '/edit';
export const DELETE_CATEGORIES = CATEGORY_URL + '/delete-soft';
export const DATATABLE_CATEGORY_URL = CATEGORY_URL + '/g/';

export const CATEGORY_ID = URL + 'api/categories';
export const MODERATION_BY_PRODUCT_ID_URL = URL + 'api/auctions/auction';
export const BID_URL = URL + 'api/bids/create';
export const LISTBID_URL = URL + 'api/bids/auction';

export const BARCHART_URL = URL + 'api/orders-detail/chart';
export const TURNOVERBYMONTH_URL = URL + 'api/orders-detail/turnoverByMonth';

export const REGISTER_URL = URL + 'api/auth/register';
export const LOGIN_URL = URL + 'api/auth/login';

export const EDIT_PASSWORD_ACCOUNT_URL = URL + 'api/accounts/update/password';
