const searchDefault = {
    suggestions: [],
    history: []
}

export const SearchReducer = (search = searchDefault, action) => {
    switch (action.type) {
        case 'LIST_SEARCH_SUGGESTIONS':
            return {...search, suggestions: action.payload}
            break;
        default:
            return search
            break;
    }
}