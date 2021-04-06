import React from 'react'
import { showPasswordIcon, hidePasswordIcon } from '../LoginForm/icons'


const PasswordBox = ({formState, borderColor, stateProperty, updateInputBox, showHidePass}) => {

    const renderInputType = ()=>{//changing input type to show password
        const {show} = formState[stateProperty] //checking state of showpassword
        let inputType;
        if(show){
            inputType = 'text'
        }
        else{
            inputType = 'password'
        }
        return inputType;
    }

    const renderShowPasswordIcon= ()=>{//rendering show/hide password icons
        let {show} = formState[stateProperty]
        let Icon;
        if(!show){
            Icon = showPasswordIcon 
        }
        else{
            Icon = hidePasswordIcon
        }
        return Icon;
    }


    return(
        <div className="input password" style={ {border: `1px solid ${borderColor}`} } >
            <input
                autoComplete="on"
                value={formState[stateProperty].value}
                onChange={e=>updateInputBox(e,formState, stateProperty)} 
                type={renderInputType()}
                className="password-input"
                placeholder="Password"
            />
            <button 
                className="toggle-password" 
                onClick={e=>showHidePass(e,formState,stateProperty)}>
                    {renderShowPasswordIcon()}
            </button>
        </div>
    )
}

export default PasswordBox