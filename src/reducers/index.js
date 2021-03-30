import { combineReducers } from 'redux'

const searchReducer = (searchHistory=[],action)=> {
    switch(action.type) {
        case 'SEARCH':
            return [...searchHistory,action.payload]
        default:
            return searchHistory
    }
}

export default combineReducers(
    {
        searchHistory: searchReducer
    }
)