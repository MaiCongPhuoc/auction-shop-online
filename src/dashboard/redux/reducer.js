import AccountService from '../services/AccountService';

let initState = {
    accounts: [],
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'products/addproduct':
            return {
                ...state,
            };
        case 'accounts/listAccount':
            return {
                ...state,
                accounts: action.payload,
            };
        default:
            return state;
    }
};
export default rootReducer;
