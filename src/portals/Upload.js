import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { searchTMDB, selectSuggestion, writeTV, writeMovie } from '../actions'
import SubmitBtn from '../components/Utility/SubmitBtn/SubmitBtn'
import Searchbox from './Searchbox/Searchbox'
import Textbox from './Textbox/Textbox'

import './Upload.scss'

const Upload = ({show, parent, searchTMDB, searchSuggestions, selectSuggestion, current, notifs, writeTV}) =>{
    const[radioValue,setRadioValue] = useState('movie')
    const[title,setTitle] = useState('')
    const[year, setYear] = useState('')
    const[genres, setGenres] = useState('')
    const[id,setId] = useState('')
    const[season, setSeason] = useState('')
    const[episode, setEpisode] = useState('')
    const[magnet, setMagnet] = useState('')
    const[loading,setLoading] = useState(false)

    useEffect(
        ()=>{
            if(notifs){
                setLoading(false)
            }
        },
        [notifs]
    )

    useEffect(
        ()=>{
            if(current){
                const{title, name, id, genre_ids, release_date, first_air_date} = current
                if(id){
                    setId(id)
                }
                if(genre_ids){
                    setGenres(genre_ids)
                }
                const parseDate = (date)=>{
                    let res
                    try {
                        date = date.slice(0,4)
                        res = date
                    }
                    catch {
                        res = ''
                    }
                    finally {
                        return res
                    }
                }
                switch (radioValue) {
                    case 'movie':
                        setTitle(title)
                        setYear(parseDate(release_date))
                        break;
                    case 'tv':
                        setTitle(name)
                        setYear(parseDate(first_air_date))
                        break;
                    default:
                        break;
                }
            }
        },
        [current]
    )

    let movieRadioRef

    if(!show || !parent){
        return null
    }

    const renderSeason = ()=>{
        if(radioValue === 'tv'){
            return(
                <div className="season" style={{display:'flex'}}>
                    <Textbox
                        label="Season"
                        style={{width:'80px', marginRight:'10px'}}
                        type="number"
                        value ={season}
                        setValue={setSeason}
                    />
                    <Textbox
                        label="Episode"
                        style={{width:'80px'}}
                        type="number"
                        value = {episode}
                        setValue={setEpisode}
                    />
                </div>
            )
        }
    }

    const log = () =>{
        setLoading(true)
        const parsed = JSON.stringify(
            {
                [id]:{
                    type: radioValue,
                    title,
                    year,
                    genres,
                    magnet
                }
            }
        )
        console.log(parsed)
    }

    const submitToDB = e=> {
        setLoading(true)
        switch (radioValue) {
            case 'movie':
                writeMovie(["all",...genres],id, { title,release_date: year,genres,links:[magnet] })
                break;
            case 'tv':
                writeTV(["all",...genres], id,{title , first_air_date:year, genres,links:[magnet]})
            default:
                break;
        }
    }
    
    return ReactDOM.createPortal(
        <div className="portal upload-portal">
            <div className="upload-box-wrapper">
                <div className="upload-box">
                    <div className="upload-box-title">
                        <h2>Add Movie</h2>
                    </div>
                    <div className="upload-box-content">
                        <form className="upload-box-content-item" onSubmit={e=>e.preventDefault()}>
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
                            <div className="inputs">
                                <Searchbox
                                    type={radioValue}
                                    style = {{width:'480px', alignSelf:'center'}}
                                    label="Search Movie"
                                    onChange={searchTMDB}
                                    searchSuggestions={searchSuggestions}
                                    selectSuggestion={selectSuggestion}
                                />
                                <Textbox
                                    label="Title"
                                    type="text"
                                    style = {{width:'480px', alignSelf:'center'}}
                                    value={title}
                                    setValue={setTitle}
                                />
                                {renderSeason()}
                                <Textbox
                                    label="tmdb ID"
                                    style = {{width: '100px'}}  
                                    type="number"
                                    value = {id}
                                    setValue={setId}
                                />
                                <Textbox
                                    label="Year"
                                    type="number"
                                    style = {{width: '80px'}}
                                    value = {year}
                                    setValue={setYear}
                                />
                                <Textbox
                                    label="Magnet link"
                                    type="text"
                                    value = {magnet}
                                    setValue ={setMagnet}
                                />
                                <div className="action-btn-wrapper">
                                    <SubmitBtn
                                        text="Upload"
                                        loading={loading}
                                        className="action-btn"
                                        onSubmit={submitToDB}
                                    />
                                    <SubmitBtn
                                        text="Cancel"
                                        className="action-btn"
                                        onSubmit={log}
                                    />
                                </div>
                            </div>
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
    const{search:{suggestions, current}, notifications} = state
    return {searchSuggestions: suggestions, current,notifs:notifications}
}

export default connect(mapStateToProps, {searchTMDB, selectSuggestion, writeTV})(Upload)