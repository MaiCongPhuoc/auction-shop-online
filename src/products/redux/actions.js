// Product
export const setProducts = arr => {
    return {
        type: 'products/setProducts',
        payload: arr
    }

}
export const setProduct = object => {
    return {
        type: 'products/setProduct',
        payload: object
    }
}
export const setCheckProduct = boolean => {
    return {
        type: 'products/setCheckProduct',
        payload: boolean
    }
}

export const setLoadData = boolean => {
    return {
        type: 'products/setLoadData',
        payload: boolean
    }
}

// Type
export const setTypes = arr => {
    return {
        type: 'products/setTypes',
        payload: arr
    }
}

export const changeType = text => {
    return {
        type: 'lotTypes/changeType',
        payload: text
    }
}

// Login
export const loginStatus = boolean => {
    return {
        type: 'login/loginStatus',
        payload: boolean
    }
}

// Categories
export const setCategories = arr => {
    return {
        type: 'categories/setCategories',
        payload: arr
    }
}

// Filters
export const searchFilterChange = (text) => {
    return {
        type: 'filters/searchFilterChange',
        payload: text
    }
}
export const setResultsFilterChange = (arr) => {
    return {
        type: 'filters/setResultsFilterChange',
        payload: arr
    }
}
export const setSearchingFilters = (boolean) => {
    return {
        type: 'filters/setSearchingFilters',
        payload: boolean
    }
}

export const typeFiltersChange = (text) => {
    return {
        type: 'filters/typeFiltersChange',
        payload: text
    }
}

export const categoryFiltersChange = (arr) => {
    return {
        type: 'filters/categoryFiltersChange',
        payload: arr
    }
}

// Modal
export const setShowInfoProduct = (boolean) => {
    return {
        type: 'modals/showInfoProduct',
        payload: boolean
    }
}