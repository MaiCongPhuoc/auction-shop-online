const initState = {
    showCart: false,
    showCheckout: false,
    cartItems: [],
}

const cartItemsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'cartItems/setCartItems':
            return {
                ...state,
                cartItems: action.payload
            }
        case 'cartItems/setShowCart':
            return {
                ...state,
                showCart: action.payload
            }
        case 'cartItems/setShowModalCheckout':
            return {
                ...state,
                showCheckout: action.payload
            }
        
        default:
            return state;
    }
}

export default cartItemsReducer;