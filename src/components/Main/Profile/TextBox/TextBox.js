import React, {useState, useEffect} from 'react'

import './TextBox.scss'
import {discardBtn, doneIcon, editIcon} from './icons'

const TextBox = ({label, notifs, submit, defValue, showError, allowEdit}) => {
    const[value,setValue] = useState('')
    const[editable,setEdit] = useState(false)
    const[loading,setLoad] = useState(false)

    useEffect( () => {
            setLoad(false)
            try{
                const notifID = Object.keys(notifs)[0]
                const {type} = notifs[notifID]
                if(type === "success"){
                    setEdit(false)
                }
            }
            catch (error){
            }
        },
        [notifs]
    )

    useEffect( ()=>{
            if(defValue){
                setValue(defValue)
            }
        },
        [defValue]   
    )

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

    const submitEdit = () => {
        if(value && value !== defValue){
            submit(value)
            setLoad(true)
        }
        else if(value === defValue){
            showError(`New ${label} cannot be the same as the old one`)
        }

        else{
            showError(`the new ${label} has to be a valid value`)
            setValue(defValue)
        }
    }
    
    const discardEdit = () => {
        setEdit(!editable)
        setValue(defValue)
    }

    const renderEditBtn = ()=>{
        if(!editable && !loading){
            return(
                <button className="editBtn" onClick={e=>{setEdit(!editable)}}>
                    {editIcon}
                </button>
            )
        }
        else if(editable && !loading){
            return(
                <>
                    <button className="submitEditBtn" onClick={e=>submitEdit()}>
                        {doneIcon}
                    </button>
                    <button className="discardBtn" onClick={e=>discardEdit()}>
                        {discardBtn}
                    </button>
                </>
            )
        }
        else if(loading) {
            return <div className="btn-loading"></div>
        }
    }

    const renderEditBtnWrapper =()=>{
        if(allowEdit){
            return (
                <div className="btn-wrapper">
                    {renderEditBtn()}
                </div>
            )
        }
        else return null
    }

    return(
        <div className="textBox">
            <div className="textBox-label" ref={ref=>inputLabel=ref}>{label}</div>
            <div className="textBox-input-wrapper">
                <input type="text" 
                    className="textBox-input"
                    ref={ref=>inputBox=ref}
                    value = {value}
                    onChange={e=>setValue(e.target.value)} 
                    onFocus={e=>onInputFocus(e)} 
                    onBlur={e=>onInputBlur(e)}
                    disabled={enableDisable()}
                />
                {renderEditBtnWrapper()}
            </div>
        </div>
    )
} 

export default TextBox