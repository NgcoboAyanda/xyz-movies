import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { searchTMDB, selectSuggestion, writeTV, writeMovie, NotifyError } from '../../actions'
import Checkbox from '../../components/Utility/Checkbox/Checkbox'
import SubmitBtn from '../../components/Utility/SubmitBtn/SubmitBtn'
import Searchbox from '../../components/Utility/Searchbox/Searchbox'
import Textbox from '../../components/Utility/Textbox/Textbox'
import validate from './Validation'

import './Upload.scss'
import Select from '../../components/Utility/Select/Select'

const Upload = ({show, parent, searchTMDB, searchSuggestions, selectSuggestion, current, notifs, writeTV, writeMovie, dismiss, NotifyError}) =>{
    const[radioValue,setRadioValue] = useState('movie')

    const[title,setTitle] = useState('')
    const[year, setYear] = useState('')
    const[genres, setGenres] = useState('')
    const[id,setId] = useState('')
    const[season, setSeason] = useState('')
    const[episode, setEpisode] = useState('')
    const[completeSeason, setCompleteSeason] = useState(false)
    const[completeSeries, setCompleteSeries] = useState(false)
    const[tvType, settvType] = useState('episode')
    const[magnet, setMagnet] = useState('')
    const[quality, setQuality] = useState('360p')
    const[codec, setCodec] = useState('AVC')

    const[loading,setLoading] = useState(false)


    useEffect(//when notification state changes
        ()=>{
            if(notifs){
                setLoading(false)
            }
        },
        [notifs]
    )

    useEffect(//when radioValue changes
        ()=>{
            setTitle('')
            setId('')
            setYear('')
            setMagnet('')
        },
        [radioValue]
    )

    useEffect(//when current movie object changes
        ()=>{
            if(current){
                setMagnet('')
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
            const handleCompleteSeason = (value)=>{
                if(!completeSeason){
                    setEpisode('')
                    setCompleteSeries(false)
                }
                setCompleteSeason(value)
                //if every checkbox if unchecked then tvType will be episode
                if(!value && !completeSeries){
                    settvType('episode')
                }
                else if(value){
                    settvType('season')
                }
            }
            const handleCompleteSeries = (value)=>{
                if(!completeSeries){
                    setSeason('')
                    setEpisode('')
                    setCompleteSeason(false)
                }
                setCompleteSeries(value)
                //if every checkbox if unchecked then tvType will be episode
                if(!value && !completeSeason){
                    settvType('episode')
                }
                else if(value){
                    settvType('complete')
                }
            }
            const renderEpisodeBox=()=>{
                if(!completeSeason && !completeSeries){
                    return false
                }
                else return true
            }
            const result = (
                <div className="season" style={{display:'flex'}}>
                    <Textbox
                        label="Season"
                        style={{width:'80px', marginRight:'10px'}}
                        type="number"
                        value ={season}
                        setValue={setSeason}
                        disabled = {completeSeries}
                    />
                    <Textbox
                        label="Episode"
                        style={{width:'80px'}}
                        type="text"
                        value = {episode}
                        setValue={setEpisode}
                        disabled = {renderEpisodeBox()}
                    />
                    <Checkbox label="complete season" value={completeSeason} setValue={handleCompleteSeason}/>
                    <Checkbox label="complete series" value={completeSeries} setValue={handleCompleteSeries} />
                </div>
            )
            return result
        }
    }

    const handleMagnetLink = ()=>{
        //creating link object 
        switch (radioValue) {
            case 'tv':
                if(tvType === 'episode'){
                    return {
                        type: 'episode',
                        season,
                        episode,
                        quality,
                        codec,
                        link: magnet
                    }
                }
                else if(tvType === 'season'){
                    return {
                        type: 'season',
                        season,
                        quality,
                        codec,
                        link: magnet
                    }
                }
                else if(tvType === 'complete'){
                    return {
                        type: 'complete',
                        quality,
                        codec,
                        link: magnet
                    }
                }
                break;
            case 'movie':
                return {
                    type: 'movie',
                    link: magnet,
                    codec,
                    quality
                }
            default:
                break;
        }
    } 

    const submitToDB = e=> {
        setLoading(true)
        validate(
            {   
                id, 
                title, 
                type:radioValue,
                genres, 
                year, 
                links: handleMagnetLink()
            }, writeMovie, writeTV, NotifyError)
    }

    const dismissModal = ()=>{
        setMagnet('')
        setYear('')
        setId('')
        dismiss()
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
                                    label="Search"
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
                                <div className="select-wrapper" style={{display:"flex"}}>
                                    <Select 
                                        options={['360p', '576p', '720p', '1080p', '2160p']} setOption={setQuality} 
                                        value={quality}
                                        label="Quality"
                                    />
                                    <Select 
                                        options={['AVC', 'H.264', 'H.265']} 
                                        setOption={setCodec} 
                                        value={codec}
                                        label="Codec"
                                        />
                                </div>
                                <Textbox
                                    label="Year"
                                    type="number"
                                    style = {{width: '80px'}}
                                    value = {year}
                                    setValue={setYear}
                                />
                                <Textbox
                                    label="Download link"
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
                                        onSubmit={()=>{
                                            dismissModal()
                                        }}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        ,
        parent)
}

const mapStateToProps = state => {
    const{search:{suggestions, current}, notifications} = state
    return {searchSuggestions: suggestions, current,notifs:notifications}
}

export default connect(mapStateToProps, {searchTMDB, selectSuggestion, writeTV, writeMovie, NotifyError })(Upload)