import React from 'react'

const EmailBox = (props) => {
    return(
        <div className="input username" style={ {border: `1px solid ${props.borderColor}`} }>
            <input 
                type={props.type}
                value={props.email.value}
                onChange={e=>props.updateInputBox(e,'email')} 
                className={props.className}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default EmailBox