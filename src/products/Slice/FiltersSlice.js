const initState =  {
    search: '',
    type: '',
    categories: [],
    results: [],
    searching: false,
    showResultNav: false
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
    case 'filters/setShowResultNav':
        return {
                ...state,
                showResultNav: action.payload
            }
    default:
        return state;
}
}

export default filtersReducer;