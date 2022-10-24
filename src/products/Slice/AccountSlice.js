const initState = {
    account: {
        id: 3,
        username: 'MiloTran',
        fullName: 'Trần Ngọc Trung',
        phone: '0326841682',
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