import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer.js'
import { NotifReducer } from './NotifReducer.js'

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
        searchHistory: searchReducer,
        user: UserReducer,
        notifications: NotifReducer
    }
)