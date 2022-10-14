const initState = {
    loadData: false,
    products: [],
    product: {},
    checkProduct: false
}

const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'products/setProducts':
            return {
                ...state,
                products: action.payload
            }
        case 'products/setProduct':
            return {
                ...state,
                product: action.payload
            }
        case 'products/setLoadData':
            return {
                ...state,
                loadData: action.payload
            }
        case 'products/setCheckProduct':
            return {
                ...state,
                checkProduct: action.payload
            }

        default:
            return state
    }
}

export default productsReducer;