import {SET_PRODUCTS, SET_TYPE} from './constants';

const initState = {
    login: true,
    type: "Tất cả",
    lotTypes: ["Tất cả", "Đấu giá", "Cửa hàng"],
    categories: [],
    products: []
}

function reducer(state, action) {
    switch (action.type) {
        case SET_TYPE:
            return {
                ...state,
                type: action.payload
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            throw new Error('Invalid action.');
    }
}

export {initState};
export default reducer;