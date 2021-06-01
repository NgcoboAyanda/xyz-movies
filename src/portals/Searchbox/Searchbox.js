import React, { useCallback, useState, useRef, useEffect } from 'react'
import useDebounce from './Debounce'

import './Searchbox.scss'

const Searchbox = ({label, style, onChange, type, searchSuggestions, selectSuggestion})=>{
    const[value,setValue] = useState('')
    const[loading, setLoading] = useState(false)
    const[suggestions,setSuggestions] = useState(searchSuggestions)

    let inputLabel //inputLabel ref

    const onInputFocus = (e)=>{
        const color = 'var(--primary-light)'
        inputLabel.style.color = color
        e.target.style.borderColor = color
    }

    const onInputBlur = (e)=>{
        inputLabel.style.color = 'rgba(0, 0, 0, 0.678)'
        e.target.style.borderColor = 'rgba(0, 0, 0, 0.575)'
    }

    const handleInputChange = (e) =>{
        const the_value = e.target.value
        setValue(the_value)
        if(the_value.length > 1){
            setLoading(true)
        }
        else{
            setLoading(false)
            setSuggestions([])
        }
    }

    useEffect(()=>{
        setLoading(false)
        setSuggestions(searchSuggestions)
    }, [searchSuggestions])

    //debouncedSearchTerm will only change once every 700 milliseconds
    const debouncedSearchTerm = useDebounce( value, 700)

    //only submit api request when debouncedSearchTerm changes
    useEffect(
        () => {
            if(debouncedSearchTerm) {
                onChange(type, debouncedSearchTerm)
            }
        },
        [debouncedSearchTerm]
    )

    const renderSearchSuggestions = () => {
        if(value){
            return(
                suggestions.map(movie=>{
                    const{id} = movie
                    const renderTitle = ()=> {
                        const {name, title} = movie
                        if(name){
                            return name
                        }
                        else return title
                    }
                    const renderReleaseDate = ()=> {
                        const{release_date, first_air_date} = movie
                        if(release_date){
                            return release_date.substring(0,4)
                        }
                        if(first_air_date){
                            return first_air_date.substring(0,4)
                        }
                        else return ''
                    }
                    const renderRating = () =>{
                        const{vote_average} = movie
                        if(vote_average){
                            let res = String(vote_average)
                            if(!res.includes('.')){
                                res += '.0'
                            }
                            return res
                        }
                        else return '?.?'
                    }
                    const renderPoster = () => {
                        const{poster_path} = movie
                        if(poster_path){
                            return <img className="photo-image" alt="search suggestion" src={`http://image.tmdb.org/t/p/w92/${poster_path}`} />
                        }
                        else return <div className="photo-image" style={{backgroundColor:'black'}}></div>
                    }
                    return (
                        <li className="search-suggestion" onClick={()=>{
                            selectSuggestion(movie)
                            setValue('')
                        }} key={id}>
                            <span className="photo">
                                 {renderPoster()}
                            </span>
                            <span className="text">
                                <span className="text-title">{renderTitle()}</span>
                                <span className="text-year">{renderReleaseDate()}</span>
                            </span>
                            <span className="rating">
                                {renderRating()}
                            </span>
                        </li>
                    )
                })
            )
        }
    }

    const renderLoader = ()=>{
        if(loading){
            return <div className="loader"></div>
        }
    }

    return(
        <div className="textBox" style={style}>
            <div className="textBox-label" style={{color:'rgba(0, 0, 0, 0.68)'}} ref={ref=>inputLabel=ref}>{label}</div>
            <div className="textBox-input-wrapper" style={{background:'white'}}>
                <input type="text" 
                    style={{paddingRight:'0'}}
                    className="textBox-input"
                    value = {value}
                    onChange={e=>handleInputChange(e)} 
                    onFocus={e=>onInputFocus(e)} 
                    onBlur={e=>onInputBlur(e)}
                />
                {renderLoader()}
            </div>
            <div className="textBox-suggestion">
                <ul className="textBox-suggestion-items">
                    {renderSearchSuggestions()}
                </ul>
            </div>
        </div>
    )
}

export default Searchbox