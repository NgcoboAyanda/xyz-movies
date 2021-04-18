import React, { Component } from 'react'
import './Profilepage.scss'

class Profilepage extends Component {
    state = {username:{value:'Super555',editMode:false}}

    render(){
        return(
            <main>
                <div className="profile-page">
                    <section className="profile-page-info">
                        info
                    </section>
                    <section className="profile-page-settings">
                        settings
                    </section>
                </div>
            </main>
        )
    }
}

export default Profilepage