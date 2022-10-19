const initState = {
    account: {
        id: 3,
        username: 'HaleyRollins',
        role: 3
    }
}

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case 'account/setAccount':
            return {
                ...state,
                products: action.payload
            }

        default:
            return state
    }
}

export default accountReducer;