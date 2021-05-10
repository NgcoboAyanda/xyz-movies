export const UserReducer = (user = {loggedIn:false}, action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS':
            return {...action.payload,loggedIn:true}
        case 'SIGNUP_SUCCESS':
            return action.payload
        case 'LOGOUT_SUCCESS':
            return {...action.payload}
        case 'UPDATE_DISPLAY_NAME':
            const {displayName} = action.payload
            return {...user,displayName}
        case 'UPDATE_PHOTO':
            const {photoURL} = action.payload
            return {...user,photoURL}
        case 'UPDATE_EMAIL':
            const {email} = action.payload
            return {...user,email}
        default:
            return user
    }
}