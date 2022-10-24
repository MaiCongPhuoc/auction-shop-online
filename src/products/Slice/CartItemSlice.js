const initState = {
    showCart: false,
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
        
        default:
            return state;
    }
}

export default cartItemsReducer;