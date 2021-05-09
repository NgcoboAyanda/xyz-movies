import React, {useState, useEffect} from 'react'

import './PasswBox.scss'
import {discardBtn, doneIcon, editIcon} from './icons'

const PasswBox = ({label, onChange, defValue, showError, allowEdit}) => {

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


    return(
        <div className="textBox">
            <div className="textBox-label" ref={ref=>inputLabel=ref}>{label}</div>
            <div className="textBox-input-wrapper">
                <input type="text" 
                    className="textBox-input"
                    ref={ref=>inputBox=ref}
                    value = {defValue}
                    onChange={e=>onChange(e.target.value)} 
                    onFocus={e=>onInputFocus(e)} 
                    onBlur={e=>onInputBlur(e)}
                />
            </div>
        </div>
    )
} 

export default PasswBox