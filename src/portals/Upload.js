import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { searchTMDB } from '../actions'
import Searchbox from './Searchbox/Searchbox'

import './Upload.scss'

const Upload = ({show, parent, searchTMDB, searchSuggestions}) =>{
    const[radioValue,setRadioValue] = useState('movie')
    let movieRadioRef

    if(!show || !parent){
        return null
    }
    
    return ReactDOM.createPortal(
        <div className="portal upload-portal">
            <div className="upload-box-wrapper">
                <div className="upload-box">
                    <div className="upload-box-title">
                        <h2>Add Movie</h2>
                    </div>
                    <div className="upload-box-content">
                        <form className="upload-box-content-item">
                            <div className="radios">
                                <div className="option">
                                    <input type="radio" ref={ref=> movieRadioRef=ref} name="media" id="movie" value="movie"
                                    onClick={e=>setRadioValue(e.target.value)}
                                    defaultChecked={true}
                                    />
                                    <label htmlFor="movie">Movie</label>
                                </div>
                                <div className="option">
                                    <input type="radio" name="media" id="tv" value="tv" onClick={e=>setRadioValue(e.target.value)}/>
                                    <label htmlFor="tv">TV show</label>
                                </div>  
                            </div>
                            <Searchbox
                                type={radioValue}
                                label="Movie title"
                                onChange={searchTMDB}
                                searchSuggestions={searchSuggestions}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        ,
        parent
    )   
}

const mapStateToProps = state => {
    const{search:{suggestions}} = state
    return {searchSuggestions: suggestions}
}

export default connect(mapStateToProps, {searchTMDB})(Upload)