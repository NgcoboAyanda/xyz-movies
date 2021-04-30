import React, {useState, useEffect} from 'react'

import './EmailBox.scss'
import {doneIcon, editIcon, discardBtn} from './icons'

const EmailBox = ({label,notifs,submit,defValue,showError,verified}) => {
    const[value,setValue] = useState('')
    const[editable,setEdit] = useState(false)
    const[loading,setLoad] = useState(false)

    useEffect( () => {
            setLoad(false)
            setEdit(false)
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
                    <button className="editBtn" onClick={()=>{setEdit(!editable)}}>
                        {editIcon}
                    </button>
            )
        }
        else if(editable && !loading){
            return(
                <>
                    <button className="submitEditBtn" onClick={()=>submitEdit()}>
                        {doneIcon}
                    </button>
                    <button className="discardBtn" onClick={()=>discardEdit()}>
                        {discardBtn}
                    </button>
                </>
            )
        }
        else if(loading) {
            return <div className="btn-loading"></div>
        }
    }

    const renderEmailVerificationStatus=()=>{
        if(verified){
            return(
                <div className="verifiedBox verified">
                    verified
                </div>
            )
        }
        else if(!value){
            return null
        }
        else{
            return(
                <div className="verifiedBox unverified">
                    unverified
                </div>
            )
        }
    }

    return( 
        <>
            <div className="EmailBox">
                <div className="EmailBox-label" ref={ref=>inputLabel=ref}>
                    {label}
                </div>
                <div className="EmailBox-input-wrapper">
                    <input type="email" 
                        className="EmailBox-input"
                        ref={ref=>inputBox=ref}
                        value = {value}
                        onChange={e=>setValue(e.target.value)} 
                        onFocus={e=>onInputFocus(e)} 
                        onBlur={e=>onInputBlur(e)}
                        disabled={enableDisable()}
                    />
                    <div className="btn-wrapper">
                        {renderEditBtn()}
                    </div>
                </div>
                {renderEmailVerificationStatus()}
            </div>
        </>
    )
} 

export default EmailBox