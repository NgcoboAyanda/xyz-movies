import history from '../history.js'
import firebase from 'firebase/app'
import 'firebase/auth'
import uniqid from 'uniqid'
import {getDatabase, ref, set} from "firebase/database"
import { snap } from 'gsap/gsap-core'

//Action creators
export const Search = term => {
    return {
        type: 'SEARCH',
        payload: term
    }
}

export const LoginSuccess=(response,emailVerified)=> async dispatch =>{ {//Login succesful
    
    switch (emailVerified) {
        case true:
            const {uid,email,emailVerified,displayName,photoURL} = response 
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
            break;
        case false:
            dispatch( NotifyError('Verify email to login!!!') )
            const user = firebase.auth().currentUser
            dispatch( LogOut() )
        default:
            break;
    }
    
  }
}        

export const LogoutSuccess=()=> async dispatch=>{
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
        const {user:{emailVerified}} = response
        dispatch( LoginSuccess(response.user, emailVerified) )
    }) 
    .catch(err=> dispatch( NotifyError(err.message) ))
}

export const signUp = ( email,password ) => async dispatch=>{
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(response => {
        const {user:{emailVerified}} = response
        dispatch(verifyEmail())
        dispatch( LoginSuccess(response.user, emailVerified) )
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
    .then(()=>{
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
    .then(resp => resp)
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

export const searchTMDB = (type, title) => async dispatch =>{
    const API_KEY = process.env.REACT_APP_TMDB
    const response = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${title}`)
    const{status,results} = response
    if(status === 200){
        response.json()
        .then(res=>{
            const {results} = res
            let firstFiveResults = results.slice(0,5)
            dispatch({
                type: 'LIST_SEARCH_SUGGESTIONS',
                payload: firstFiveResults
            })
        })
    }
}

export const selectSuggestion = (suggestion) =>{
    return {
        type: 'SELECT_SEARCH_SUGGESTION',
        payload: suggestion
    }
}

/* ctrl + k + 0 to fold all */

export const writeTV = obj => async dispatch =>{
    const db = await firebase.database()
    const{id} = obj//getting movie id
    db.ref(`tv/${id}`).once('value', async data=>{
        let result = data.val()
        const link = obj.links// the new link user just added
        if(result){//show already exists on db
            const oldLinks = result.links
            let newLinks = []
            let error = false
            //getting every link in oldLinks and adding it to newLinks
            if(oldLinks){
                for(let [key, value] of Object.entries(oldLinks)){
                    if(value.link !== link.link){
                        newLinks.push(value)
                    }
                    else{
                        error = true
                        dispatch(NotifyError("Download link already exists!"))
                    }
                }
            }
            if(!error){//only adding link if there are no errors
                db.ref('tv').child(id).set(
                    {
                    ...obj,
                   links:[...newLinks, link]//adding new link to the show's list of links
                    }
                ).then(()=>dispatch(NotifySuccess("TV Show upload succesful.")))
                .catch(err=>dispatch(NotifyError(err.message)))
            }
        }
        else{//show doesnt already exist
            db.ref(`tv`).child(id).set({
                ...obj,
                links:[link]
            }).then(()=>dispatch(NotifySuccess("TV Show upload succesful.")))
            .catch(err=>dispatch(NotifyError(err.message)))
        }
    })
}

export const writeMovie = obj => async dispatch =>{
    const db = await firebase.database()
    const{id} = obj//getting movie id
    db.ref(`movie/${id}`).once('value', async data=>{
        let result = data.val()
        const link = obj.links// the new link user just added
        if(result){//show already exists on db
            const oldLinks = result.links
            let newLinks = []
            let error //
            //getting every link in oldLinks and adding it to newLinks
            if(oldLinks){//if oldLinks exist
                for(let [key, value] of Object.entries(oldLinks)){
                    if(value.link !== link.link){
                        newLinks.push(value)
                    }
                    else{
                        dispatch(NotifyError("Download link already exists!"))
                        error = true//setting errors to true if download link already exists
                    }
                }
            }
            if(!error){
                db.ref('movie').child(id).set(
                    {
                        ...obj,
                    links:[...newLinks, link]//adding new link to the show's list of links
                    }
                ).then(()=>dispatch( NotifySuccess("Movie upload successful.") ))
                .catch(err=>dispatch( NotifyError(err.message) ))
            }
        }
        else{//show doesnt already exist
            db.ref(`movie`).child(id).set({
                ...obj,
                links:[link]
            }).then(()=>dispatch( NotifySuccess("Movie upload successful.") ))
            .catch(err=>dispatch( NotifyError(err.message) ))
        }
    })
}


