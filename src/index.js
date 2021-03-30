import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import firebase from 'firebase/app' //firebase
import 'firebase/analytics' //firebase analytics
import 'firebase/auth' //firebase auth

import App from './components/App'
import './index.scss'

import reducers from './reducers'

const firebaseConfig = {
    apiKey: ""
}
firebase.initializeApp(firebaseConfig)

const Store = createStore(reducers, composeWithDevTools( applyMiddleware(thunk) )  );

render(
    <Provider store={Store}>
        <App/>
    </Provider>
    ,
    document.querySelector('#root')
)
