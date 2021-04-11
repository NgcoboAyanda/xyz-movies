import React, {Component} from 'react'
import {connect} from 'react-redux'

import './Searchpage.scss' //stylesheet



class SearchPage extends Component{

    renderSearchResults(){
        
    }

    render(){
        return(
            <main className="search-page-wrapper">
                <div className="searchPage">
                    <h2 className="searchPage-title">
                        You searched for: <span>{this.props.match.params.term}</span>
                    </h2>
                    <div className="searchPage-results">

                    </div>
                </div>
            </main>
        )
    }
}

export default connect(null,{})(SearchPage)