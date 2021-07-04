import React from 'react'

const containerStyles = {
    height:'60px',
    marginLeft:'15px',
    display:'flex',
    alignItems:'center',
    fontSize:'0.8rem'
}

const style = {
    height:'20px',
    width: '20px',
    cursor: 'pointer'
}

const Checkbox = ({label, value, setValue}) => {
    return(
        <div className="check-box-container" style={containerStyles}>
            <label htmlFor="check">
                {label}
            </label>
            <input checked={value} name="check" onChange={e=>setValue(e.target.checked)} type="checkbox" style={style}/>
        </div>
    )
}

export default Checkbox