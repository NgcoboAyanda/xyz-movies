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

export const LoginSuccess=(userId,email)=> async dispatch =>{ {//Login succesful
    const msg = 'You are now logged in'
    dispatch(NotifySuccess(msg))
    history.push(`/user/${userId}`)
    dispatch({
        type: 'LOGIN_SUCCESS',
        payload:{
            userId,
            email
        }
    })
} }       


export const PasswordResetSuccess=()=>{//Password Reset Successful
    return{
        type: 'PASSWORD_RESET',
        payload: 'Password reset email has been sent, please check your email'
    }
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
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userDetails => userDetails.user )
    .catch(err=> err)
    if(!response.code){//if the response doesnt have code then it was successful
        const {uid, email} = response
        dispatch(LoginSuccess(uid,email))
    }
    else{// if the response has a code and message then it failed
        const {code,message} = response
        dispatch( NotifyError(message) )
    }
}

export const signUp = ( email,password ) => async dispatch=>{
    const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(userDetails => userDetails)
    .catch(err=> err)
    if(!response.code){//if the response doesnt have a code property then its successful
        const msg = 'Succesfully signed up'
        dispatch(NotifySuccess(msg))
        const {uid, email} = firebase.auth().currentUser
        dispatch(LoginSuccess(uid,email))
    }
    else{
        console.log(response)
        const {code, message} = response
        dispatch(NotifyError(code,message))
    }  
}

export const resetPassword = ( email )=> async dispatch=>{
    const response = await firebase.auth().sendPasswordResetEmail(email)
    .then(resp =>resp)
    .catch(err => err)
    if(!response){
        const msg = 'Password reset link has been sent to your email'
        dispatch(NotifySuccess(msg))
    }
    else if(response){
        console.log(response)
    }
}
