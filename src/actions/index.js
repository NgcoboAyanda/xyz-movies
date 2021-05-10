import history from '../history.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import uniqid from 'uniqid'

//Action creators
export const Search = term => {
    return {
        type: 'SEARCH',
        payload: term
    }
}

export const LoginSuccess=({uid,email,emailVerified,displayName,photoURL})=> async dispatch =>{ {//Login succesful
    const msg = 'You are now logged in'
    dispatch(NotifySuccess(msg))
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload:{
            userId:uid,
            email,
            emailVerified,
            displayName,
            photoURL
        }
    })
} }       

export const LogoutSuccess=()=> async dispatch=>{
    const msg = "You've been successfully logged out"
    dispatch( NotifySuccess(msg) )

    dispatch({
        type: 'LOGOUT_SUCCESS',
        payload: {
            loggedIn: false
        }
    })
}


export const NotifySuccess = (msg)=>{
    const id =  uniqid()//notification id
    return {
        type: 'SUCCESS',
        payload: {[id]:{type:'success',msg}}
    }
}

export const NotifyError = (msg)=>{
    const id = uniqid()//notification id
    return {
        type: 'ERROR',
        payload: {[id]:{type:'error',msg}}
    }
}

export const Login = (email,password) => async (dispatch)=>{
    await firebase.auth().signInWithEmailAndPassword(email, password)
    .then((response)=> {
        dispatch( LoginSuccess(response.user) )
    }) 
    .catch(err=> dispatch( NotifyError(err.message) ))
}

export const signUp = ( email,password ) => async dispatch=>{
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
        dispatch( NotifySuccess('Successfully signed up, you will be logged in shortly') )
        dispatch( LoginSuccess(user) )
    })
    .catch(err=> dispatch( NotifyError(err.message) ))
}

export const resetPassword = ( email )=> async dispatch=>{
    await firebase.auth().sendPasswordResetEmail( email )
    .then(() => {
        dispatch( NotifySuccess('Password reset link has been sent to your email') )
    })
    .catch(err => dispatch( NotifyError(err.message) ))
}

export const LogOut = () => async dispatch => {
    await firebase.auth().signOut()
    .then(() => dispatch( LogoutSuccess() ))
    .catch(err => dispatch( NotifyError(err.message) ))
}


export const updateDisplayName = (newDisplayName) => async dispatch => {
    const user = firebase.auth().currentUser
    await user.updateProfile({displayName: newDisplayName})
    .then(()=>{
        dispatch(
            NotifySuccess(`Display name has been successfully changed to ${newDisplayName}`)
        )
        dispatch(
            {
                type:'UPDATE_DISPLAY_NAME',
                payload: {
                    displayName: newDisplayName
                }
            }
        )
    })
    .catch(err=>NotifyError(err.message))
}

export const updatePhotoURL = (newPhotoURL) => async dispatch => {
    const user = firebase.auth().currentUser
    await user.updateProfile({photoURL:newPhotoURL})
    .then((response)=>{
        console.log(response.status)
        dispatch(
            NotifySuccess(`PhotoURL has been successfully changed`)
        )
        dispatch(
            {
                type:'UPDATE_PHOTO',
                payload: {
                    photoURL:newPhotoURL
                }
            }
        )
    })
    .catch(err=>dispatch( NotifyError(err.message) ) )
}

export const verifyEmail = () => async dispatch =>{
    const user = firebase.auth().currentUser
    await user.sendEmailVerification()
    .then(()=>{
        dispatch( NotifySuccess('Verification Email has been sent, please check your inbox') )
    })
    .catch(err=> dispatch( NotifyError(err.message) ))
}

export const changePassword = (email, oldPass,newPassword) => async dispatch => {
    const user = await firebase.auth().currentUser
    const updatePass = async () => await user.updatePassword(newPassword)
    .then(()=>{
        dispatch(NotifySuccess('Password has been successfully changed!'))
    })
    .catch(err => {
        dispatch(NotifyError(err.message))
    })
    dispatch(reAuthenticate(email,oldPass,updatePass))
}

export const deleteAccount = (email, password) => async dispatch => {
    const user = await firebase.auth().currentUser
    const deleteAcc = async () => {
        await user.delete()
        .then(()=>{
            dispatch(NotifySuccess('Account successfully deleted!'))
            setTimeout(() => {
               dispatch(LogoutSuccess()) 
            }, 2000);
        })
        .catch(err => dispatch(NotifyError(err.message)))
    }
    dispatch(reAuthenticate(email, password,deleteAcc))
}

export const updateEmail = (oldEmail, password, newEmail) => async dispatch => {
    const user = await firebase.auth().currentUser
    const update = async () => {
        await user.updateEmail(newEmail)
        .then(()=>{
            dispatch(NotifySuccess('Email was successfully changed'))
            dispatch ({
                type: 'UPDATE_EMAIL',
                payload: {email: newEmail}
            })
        })
        .catch(err=>{
            dispatch(NotifyError(err.message))
        })
    }
    dispatch(reAuthenticate(oldEmail, password, update))
}

export const reAuthenticate = (email,password, my_function) => async dispatch =>{
    const user = await firebase.auth().currentUser
    const credential = firebase.auth.EmailAuthProvider.credential(email,password)
    await user.reauthenticateWithCredential(credential)
    .then(()=> dispatch(my_function))
    .catch(err=> dispatch(NotifyError(err.message)))
}

