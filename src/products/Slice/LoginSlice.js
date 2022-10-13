const initState = {
    login: true
}

const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case 'login/loginStatus':
            return {
                ...state,
                login: action.payload
            }

        default:
            return state
    }
}

export default loginReducer;