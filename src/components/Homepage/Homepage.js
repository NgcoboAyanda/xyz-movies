import React from 'react';

import Movies from './Movies/Movies.js';
import Banner from './Banner/Banner.js';
import './Homepage.scss';


const Homepage = ()=>{

    return(
        <main className="main">
            <Banner/>
            <Movies/>
        </main>
    )
};

export default Homepage;