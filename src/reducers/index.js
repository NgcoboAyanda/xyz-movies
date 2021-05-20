import { combineReducers } from 'redux'
import { UserReducer } from './UserReducer.js'
import { NotifReducer } from './NotifReducer.js'
import { SearchReducer } from './SearchReducer.js'


export default combineReducers(
    {
        search: SearchReducer,
        user: UserReducer,
        notifications: NotifReducer
    }
)