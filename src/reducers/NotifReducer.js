export const NotifReducer = (notifications={},action)=> {
    switch(action.type){
        case 'SUCCESS':
            return action.payload
        case 'ERROR':
            return action.payload
        default:
            return notifications
    }
}