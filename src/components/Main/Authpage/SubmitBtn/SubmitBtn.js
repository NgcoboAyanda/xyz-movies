import React from 'react'

const SubmitBtn = (props)=>{
    const loading = props.loading


    return(
        <>
            <button
                onClick={e=>props.onSubmit(e)}
                type="submit" 
                className="btn login-btn">
                {props.text}
            </button>
        </>
    )
}

export default SubmitBtn