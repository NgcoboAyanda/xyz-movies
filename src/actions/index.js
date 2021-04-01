import history from '../history.js'
import firebase from 'firebase/app'
import 'firebase/auth'


//Action creators
export const Search = term => {
    history.push(`/search/${term}`)
    return {
        type: 'SEARCH',
        payload: term
    }
}

export const Login = (email,password) => async (dispatch)=>{
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    .then(userDetails => userDetails.user )
    .catch(err=> err)
    if(!response.code){//if the response doesnt have code then it was successful
        const {uid} = response
        dispatch( {
            type:'LOGIN',
            payload: {uid,loggedIn:true}
        })
    }
    else{// if the response has a code and message then it failed
        const {code,message} = response
        dispatch( {
            type:'LOGIN',
            payload: {error: {code,message}}
        })
    }
}

export const signUp = (email,password) => async (dispatch)=>{
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userDetails => dispatch({type:'SIGNUP',payload:userDetails.user}))
        .catch(err=> console.log(err))
}