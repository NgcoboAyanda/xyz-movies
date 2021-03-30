import history from '../history.js'

//Action creators


export const Search = term => {
    history.push(`/search/${term}`)
    return {
        type: 'SEARCH',
        payload: term
    }
}

export const Login = (username,password) => {
    return {
        type: 'LOGIN',
        payload: {
            username,
            password
        }
    }
}