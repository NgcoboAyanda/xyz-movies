import React, {Component} from 'react';

import "./Login.scss";

class Login extends Component {zzv
    state = {showPassword: false, username: '', password: ''}

    renderInputType = ()=>{
        let pass = this.state.showPassword;
        let inputType;
        if(pass){
            inputType = 'text'
        }
        else{
            inputType = 'password'
        }
        return inputType;
    }

    renderShowPasswordIcon= ()=>{
        let pass = this.state.showPassword;
        let showPassIcon;
        if(!pass){
            showPassIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12.015 7c4.751 0 8.063 3.012 9.504 4.636-1.401 1.837-4.713 5.364-9.504 5.364-4.42 0-7.93-3.536-9.478-5.407 1.493-1.647 4.817-4.593 9.478-4.593zm0-2c-7.569 0-12.015 6.551-12.015 6.551s4.835 7.449 12.015 7.449c7.733 0 11.985-7.449 11.985-7.449s-4.291-6.551-11.985-6.551zm-.015 5c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2zm0-2c-2.209 0-4 1.792-4 4 0 2.209 1.791 4 4 4s4-1.791 4-4c0-2.208-1.791-4-4-4z"/></svg>
        }
        else{
            showPassIcon = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z"/></svg>
        }
        return showPassIcon;
    }

    showHidePass=(e)=>{
         let passwordState = this.state.showPassword;
        this.setState({showPassword: !passwordState})
        e.preventDefault();
    }

    render(){
        return(
            <div className="login-page">
                <div className="login-page-bg"></div>
                <form action="" className="login-page-form">
                    <div className="title">
                        <h2>Login</h2>
                    </div>
                    <div className="input username">
                        <input 
                            type="text"
                            value={this.state.username}
                            onChange={e=>this.setState({username: e.target.value})} 
                            className="username-input"
                            placeholder="Username"
                        />
                    </div>
                    <div className="input password">
                        <input
                            value={this.state.password}
                            onChange={e=>this.setState({password: e.target.value})} 
                            type={this.renderInputType()}
                            className="password-input"
                            placeholder="Password"
                        />
                        <button 
                            className="toggle-password" onClick={e=>this.showHidePass(e)}>
                            {this.renderShowPasswordIcon()}
                        </button>
                    </div>
                    <button
                        onClick={e=>e.preventDefault()}
                        type="submit" 
                        className="btn login-btn">
                        Login
                    </button>
                </form>
            </div>
        )
    }

}

export default Login;