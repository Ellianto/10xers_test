import React from 'react';

import './CustomHeader.css';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {Carousel} from 'react-responsive-carousel';

import {getMovieBackdropUrl} from '../api';

function CustomHeader(props){
    const topMovieList = props.topMovies;
    
    const renderTopMoviesList = () => topMovieList.map(movie => (
        <div key={movie.id}>
            <img
                className="d-block w-100"
                style={{objectFit:'cover', objectPosition:'right center', height:'40vh'}}
                src={getMovieBackdropUrl(movie.backdrop_path)}
                alt={movie.title + " Backdrop Image"}
                // height={512}
            />
        </div>
    ));


    return (
        !topMovieList || topMovieList.length <= 0 ? null :
        <div className='sticky-header'>
            <div className='header-container'>
                <Carousel
                    autoPlay={true}
                    infiniteLoop={true}
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                    showThumbs={false}
                    stopOnHover={false}
                    swipable={false}
                >
                    { renderTopMoviesList() }
                </Carousel>
                <div className='header-gradient'>
                    <div className='header-element'>
                        <h1> MovieList </h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomHeader;