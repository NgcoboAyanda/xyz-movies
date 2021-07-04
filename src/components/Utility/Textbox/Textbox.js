import React, { useState, useEffect } from 'react'

const Textbox = ({style, label, type, value = '', setValue, disabled}) => {
    let inputLabel
    let inputBox

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
        <div className="textBox" style={style} >
            <div className="textBox-label" style={{color:'rgba(0, 0, 0, 0.68)'}} ref={ref=>inputLabel=ref}>{label}</div>
            <div className="textBox-input-wrapper">
                <input type="text" 
                    className="textBox-input"
                    type={type}
                    ref={ref=>inputBox=ref}
                    value = {value}
                    onChange={e=>setValue(e.target.value)} 
                    onFocus={e=>onInputFocus(e)} 
                    onBlur={e=>onInputBlur(e)}
                    disabled={disabled}
                />
            </div>
        </div>
    )
}

export default Textbox