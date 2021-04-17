import React from 'react'

const EmailBox = ({formState,stateProperty,type,borderColor,className,placeholder, updateInputBox}) => {

    return(
        <div className="input username" style={ {border: `1px solid ${borderColor}`} }>
            <input
                autoComplete="on"
                type='email'
                value={formState[stateProperty].value}
                onChange={e=>updateInputBox(e,formState,stateProperty)} 
                className={className}
                placeholder={placeholder}
            />
        </div>
    )
}

export default EmailBox