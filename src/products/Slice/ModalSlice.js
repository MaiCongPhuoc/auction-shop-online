const initState = {
    showInfoProduct: false,
    showAddProduct: false,
};

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case 'modals/showInfoProduct':
            return {
                ...state,
                showInfoProduct: action.payload,
            };
        case 'modals/showAddProduct':
            return {
                ...state,
                showAddProduct: action.payload,
            };

        default:
            return state;
    }
};

export default modalReducer;
