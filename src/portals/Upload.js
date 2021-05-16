import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { searchMovie } from '../actions'
import Searchbox from './Searchbox/Searchbox'

import './Upload.scss'

const Upload = ({show, parent, dismiss, searchMovie}) =>{  

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
                            <Searchbox
                                label="Movie title"
                                onChange={searchMovie}
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

export default connect(null, {searchMovie})(Upload)