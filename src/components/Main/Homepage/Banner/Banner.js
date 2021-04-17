import React from 'react';

 import './Banner.scss';

const Banner = () => {

    return(
        <>
            <div className="front-page">
                <div className="front-page-poster">
                    <div className="text">
                        <h3 className="text-heading">
                            Snyder's Justice League out now
                        </h3>
                        <button className="text-cta">
                            watch now
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banner;