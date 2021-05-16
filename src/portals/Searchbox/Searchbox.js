import React, { useState } from 'react'

const Searchbox = ({label, onChange})=>{
    const[value,setValue] = useState('')

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

    const search = (e) => {
        setValue(e.target.value)
        onChange(value)
    }

    return(
        <div className="textBox">
            <div className="textBox-label" ref={ref=>inputLabel=ref}>{label}</div>
            <div className="textBox-input-wrapper">
                <input type="text" 
                    className="textBox-input"
                    ref={ref=>inputBox=ref}
                    value = {value}
                    onChange={e=>search(e)} 
                    onFocus={e=>onInputFocus(e)} 
                    onBlur={e=>onInputBlur(e)}
                />
            </div>
        </div>
    )
}

export default Searchbox