const initState = {
    products: [
        {}
    ],
    filters: {
        search: '',
        status: '',
    },
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case 'addProduct':
            return {
                ...state,
            }    
        default:
            break;
    }
};
 export default rootReducer;