export const AuthReducer = (user = {loggedIn:false}, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...action.payload,loggedIn:true}
        case 'SIGNUP_SUCCESS':
            return action.payload
        case 'LOGOUT_SUCCESS':
            return {...action.payload}
        default:
            return user
    }
}