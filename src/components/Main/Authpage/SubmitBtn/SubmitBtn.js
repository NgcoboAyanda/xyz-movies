import React from 'react'

import gif from './load.gif'

const SubmitBtn = ({text, loading, onSubmit})=>{

    const renderLoading=()=>{
        if(loading){
            return <img src={gif} />
        }
        else return text
    }


    return(
        <>
            <button
                onClick={e=>onSubmit(e)}
                type="submit" 
                className="btn login-btn">
                {renderLoading()}
            </button>
        </>
    )
}

export default SubmitBtn