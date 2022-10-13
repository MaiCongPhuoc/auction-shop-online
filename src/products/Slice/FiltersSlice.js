const initState =  {
    search: '',
    type: '',
    categories: [],
    results: [],
    searching: false
};

const filtersReducer = (state = initState, action) => {
switch (action.type) {
    case 'filters/searchFilterChange':
        return {
                ...state,
                search: action.payload
            }
    case 'filters/getResultsFilterChange':
        return {
                ...state,
                results: action.payload
            }
    case 'filters/setSearchingFilters':
        return {
                ...state,
                searching: action.payload
            }
    case 'filters/typeFiltersChange':
        return {
                ...state,
                type: action.payload
            }
    case 'filters/categoryFiltersChange':
        return {
                ...state,
                categories: action.payload
            }
    default:
        return state;
}
}

export default filtersReducer;