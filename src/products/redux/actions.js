// Account
export const setAccount = (object) => {
    return {
        type: 'account/setAccount',
        payload: object,
    };
};

// Product
export const setProducts = (arr) => {
    return {
        type: 'products/setProducts',
        payload: arr,
    };
};
export const setProduct = (object) => {
    return {
        type: 'products/setProduct',
        payload: object,
    };
};
export const setCheckProduct = (boolean) => {
    return {
        type: 'products/setCheckProduct',
        payload: boolean,
    };
};

export const setLoadData = (boolean) => {
    return {
        type: 'products/setLoadData',
        payload: boolean,
    };
};

export const setIdProduct = (id) => {
    return {
        type: 'products/setIdProduct',
        payload: id,
    };
};

// Type
export const setTypes = (arr) => {
    return {
        type: 'products/setTypes',
        payload: arr,
    };
};

export const changeType = (text) => {
    return {
        type: 'lotTypes/changeType',
        payload: text,
    };
};

// Login
export const loginStatus = (boolean) => {
    return {
        type: 'login/loginStatus',
        payload: boolean,
    };
};

// Categories
export const setCategories = (arr) => {
    return {
        type: 'categories/setCategories',
        payload: arr,
    };
};

// Filters
export const searchFilterChange = (text) => {
    return {
        type: 'filters/searchFilterChange',
        payload: text,
    };
};
export const setResultsFilterChange = (arr) => {
    return {
        type: 'filters/setResultsFilterChange',
        payload: arr,
    };
};
export const setSearchingFilters = (boolean) => {
    return {
        type: 'filters/setSearchingFilters',
        payload: boolean,
    };
};

export const typeFiltersChange = (text) => {
    return {
        type: 'filters/typeFiltersChange',
        payload: text,
    };
};

export const categoryFiltersChange = (arr) => {
    return {
        type: 'filters/categoryFiltersChange',
        payload: arr,
    };
};

export const setShowResultNav = (boolean) => {
    return {
        type: 'filters/setShowResultNav',
        payload: boolean,
    };
};

// Modal
export const setShowInfoProduct = (boolean) => {
    return {
        type: 'modals/showInfoProduct',
        payload: boolean,
    };
};

export const setShowAddProduct = (boolean) => {
    return {
        type: 'modals/showAddProduct',
        payload: boolean,
    };
};

export const setShowEditProduct = (boolean) => {
    return {
        type: 'modals/showEditProduct',
        payload: boolean,
    };
};

export const setShowModerationProduct = (boolean) => {
    return {
        type: 'modals/showModerationProduct',
        payload: boolean,
    };
};

// Cart Items
export const setCartItems = (arr) => {
    return {
        type: 'cartItems/setCartItems',
        payload: arr,
    };
};

export const setShowCart = (boolean) => {
    return {
        type: 'cartItems/setShowCart',
        payload: boolean,
    };
};

export const setShowCartModalCheckout = (boolean) => {
    return {
        type: 'cartItems/setShowModalCheckout',
        payload: boolean
    }
}
export const setReloadCartItem = (boolean) => {
    return {
        type: 'cartItems/setReloadCartItem',
        payload: boolean
    }
}

// Order
export const setCheckPayment = (boolean) => {
    return {
        type: 'orders/setCheckPayment',
        payload: boolean,
    };
};
