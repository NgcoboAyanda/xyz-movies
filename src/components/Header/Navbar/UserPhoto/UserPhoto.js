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
        <li className="nav-list-link userPhoto">
            <Link to={`/user/${id}`}>
                {renderPhoto()}
            </Link>
        </li>
    )
}

export default UserPhoto