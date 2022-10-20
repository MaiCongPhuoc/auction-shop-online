const initState = {
    loadCartItem: false,
    cartItems: [],
}

const cartItemsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'cartItems/setCartItems':
            return {
                ...state,
                cartItems: action.payload
            }
        
        default:
            return state;
    }
}

export default cartItemsReducer;