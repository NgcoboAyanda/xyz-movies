import React, { useState } from 'react'

import './Searchbox.scss'

const Searchbox = ({label, onChange, type, searchSuggestions})=>{
    const[value,setValue] = useState('')

    let inputLabel //inputLabel ref
    let inputBox //inputBox ref

    const onInputFocus = (e)=>{
        const color = 'var(--primary-light)'
        inputLabel.style.color = color
        e.target.style.borderColor = color
    }

    const onInputBlur = (e)=>{
        inputLabel.style.color = 'rgba(0, 0, 0, 0.678)'
        e.target.style.borderColor = 'rgba(0, 0, 0, 0.575)'
    }

    const search = (e) => {
        setValue(e.target.value)
        if(value){
            setTimeout(
                ()=>{
                    onChange(type, value)
                },
                2000
            )
        }
    }

    const renderSearchSuggestions = () => {
        if(value){
            return(
                searchSuggestions.map(movie=>{
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
                        <li className="search-suggestion" key={id}>
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

    return(
        <div className="textBox" style={{alignSelf:'center', width:'480px', height:'100%'}}>
            <div className="textBox-label" ref={ref=>inputLabel=ref}>{label}</div>
            <div className="textBox-input-wrapper" style={{background:'white'}}>
                <input type="text" 
                    style={{paddingRight:'0'}}
                    className="textBox-input"
                    ref={ref=>inputBox=ref}
                    value = {value}
                    onChange={e=>search(e)} 
                    onFocus={e=>onInputFocus(e)} 
                    onBlur={e=>onInputBlur(e)}
                />
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