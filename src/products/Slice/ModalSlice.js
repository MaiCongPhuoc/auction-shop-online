const initState = {
    showInfoProduct: false
}

const modalReducer = (state = initState, action) => {
    switch (action.type) {
        case 'modals/showInfoProduct':
            return {
                ...state,
                showInfoProduct: action.payload
            }

        default:
            return state
    }
}

export default modalReducer;