import React from 'react';

 import './Banner.scss';

const Banner = () => {

    return(
        <>
            <div className="front-page">
                <div className="front-page-poster">
                    <div className="text">
                        <h3 className="text-heading">
                            Wonder Woman 1984 Out Now
                        </h3>
                        <button className="text-cta">
                            Watch now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;