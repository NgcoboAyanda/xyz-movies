import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import firebase from 'firebase'
import 'firebase/auth'
import { composeWithDevTools } from 'redux-devtools-extension'

import App from './components/App'
import './index.scss'

import reducers from './reducers'

const firebaseKey = process.env.REACT_APP_FIREBASE_API_KEY

const firebaseConfig = {
    apiKey: firebaseKey,
    authDomain: 'xyz-movies.firebaseapp.com',
    databaseURL: 'https://xyz-movies.firebaseio.com',
    projectId: 'xyz-movies',
    storageBucket: 'xyz-movies.appspot.com',
    appId: '1:361828942881:web:0ec3e18505610f03b3cf60'
}

firebase.initializeApp(firebaseConfig)

const checkSignIn = (dispatchFunc) => firebase.auth().onAuthStateChanged( user => {//checking if user is signed in
    if(user){
            dispatchFunc(user)
    }
} )

const Store = createStore(reducers, composeWithDevTools( applyMiddleware(thunk) )  );

render(
    <Provider store={Store}>
        <App checkSignIn={checkSignIn}/>
    </Provider>
    ,
    document.querySelector('#root')
)
