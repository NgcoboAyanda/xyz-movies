const searchDefault = {
    suggestions: [],
    current: {},
    history: []
}

export const SearchReducer = (search = searchDefault, action) => {
    switch (action.type) {
        case 'LIST_SEARCH_SUGGESTIONS':
            return {...search, suggestions: action.payload}
            break;
        case 'SELECT_SEARCH_SUGGESTION':
            return {...search, current: action.payload}
            break;
        default:
            return search
            break;
    }
}