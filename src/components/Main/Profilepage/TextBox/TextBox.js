import React, {useState} from 'react'

import './TextBox.scss'
import {doneIcon, editIcon} from './icons'

const TextBox = ({label}) => {
    const[value,setValue] = useState('')
    const[editable,setEdit] = useState(false)
    const[loading,setLoad] = useState(false)

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

    const enableDisable = () => {
        return editable?false:true
    }

    const renderEditBtn = ()=>{
        if(!editable && !loading){
            return(
                <button 
                    className="textBox-input-editBtn"       
                    onClick={e=>{setEdit(!editable)}}
                    >
                    {editIcon}
                </button>
            )
        }
        else if(editable && !loading){
            return(
                <button 
                    className="textBox-input-editBtn"       
                    onClick={e=>console.log('ayy')}
                    >
                    {doneIcon}
                </button>
            )
        }
        else if(loading) {
            return <div className="btn-loading"></div>
        }
    }

    return(
        <div className="textBox">
            <div className="textBox-label" ref={ref=>inputLabel=ref}>{label}</div>
            <div className="textBox-input-wrapper">
                <input type="text" 
                    className={`textBox-input`}
                    ref={ref=>inputBox=ref}
                    value = {value}
                    onChange={e=>setValue(e.target.value)} 
                    onFocus={e=>onInputFocus(e)} 
                    onBlur={e=>onInputBlur(e)}
                    disabled={enableDisable()}
                />
                {renderEditBtn()}
            </div>
        </div>
    )
} 

export default TextBox