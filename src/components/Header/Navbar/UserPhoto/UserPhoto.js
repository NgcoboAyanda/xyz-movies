import React from 'react'
import { Link } from 'react-router-dom'
import photoIcon from './picIcon.js'

import './UserPhoto.scss'

const UserPhoto = ({photo, id}) =>{

    const renderPhoto = () => {
        if(photo){
            return <img src={photo} alt="profile picture" className="userPhoto"/>
        }
        else{
            return <img src={photoIcon} alt="empty profile picture" className="userPhoto"/>
        }
    }

    return(
        <>
            <Link to={`/user/${id}`}>
                {renderPhoto()}
            </Link>
        </>
    )
}

export default UserPhoto