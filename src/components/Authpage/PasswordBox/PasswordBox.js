import React from 'react'
import { showPasswordIcon, hidePasswordIcon } from '../LoginForm/icons'


const PasswordBox = (props) => {

    const renderInputType = ()=>{//changing input type to show password
        const {show} = props.password //checking state of showpassword
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
        let {show} = props.password
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
        <div className="input password" style={ {border: `1px solid ${props.borderColor}`} } >
            <input
                value={props.password.value}
                onChange={e=>props.updateInputBox(e,'password')} 
                type={renderInputType()}
                className="password-input"
                placeholder="Password"
            />
            <button 
                className="toggle-password" 
                onClick={e=>props.showHidePass(e)}>
                    {renderShowPasswordIcon()}
            </button>
        </div>
    )
}

export default PasswordBox