import { combineReducers } from 'redux'

const searchReducer = (searchHistory=[],action)=> {
    switch(action.type) {
        case 'SEARCH':
            return [...searchHistory,action.payload]
        default:
            return searchHistory
    }
}


const userAccountReducer = (user = {loggedIn:false}, action)=>{
    switch(action.type){
        case 'LOGIN':
            return {...action.payload}
        case 'SIGNUP':
            return {...action.payload}
        default:
            return user
    }
}

export default combineReducers(
    {
        searchHistory: searchReducer,
        user: userAccountReducer
    }
)