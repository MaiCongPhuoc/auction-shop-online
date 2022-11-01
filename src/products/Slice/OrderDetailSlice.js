const initState = {
    showOrder: false,
    reloadOrder: false,
    orderDetails: []
}

const orderDetailsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'orderDetails/setOrderDetails':
            return {
                ...state,
                orderDetails: action.payload
            }
        
        default:
            return state;
    }
}

export default orderDetailsReducer;