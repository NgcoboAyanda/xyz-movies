import React from 'react'

const selectContainerStyle = {
    marginBottom:'15px'
}
const labelStyle = { 
    position:'relative', 
    top:'0', 
    left:'0', 
    color:'#575757'
}
const selectStyle = {
    marginLeft:'5px', 
    height:'30px', 
    border:'1px solid #575757', 
    fontSize:'1rem',
    cursor:'pointer'
}

export default ({options, setOption, value='...',label})=>{

    const renderOptions = ()=>{
        let key = 0
        return(
            options.map(option=>{
                key++
                return(
                    <option value={option} key={`select-option-${key}`}>
                        {option}
                    </option>
                )
            })
        )
    }

    if(!options){
        return null
    }

    return (
        <div className="select-container" style={selectContainerStyle}>
            <label htmlFor="quality-select" className="textBox-label" style={labelStyle}>
                {label}
            </label>
            <select id="quality-select" value={value} onChange={e=>setOption(e.target.value)} style={selectStyle}>
                {renderOptions()}
            </select>
        </div>
    )
}