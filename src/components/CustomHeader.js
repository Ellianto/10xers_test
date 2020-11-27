import React from 'react';

import './CustomHeader.css';

import Navbar from 'react-bootstrap/Navbar';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {Carousel} from 'react-responsive-carousel';

import {getMovieBackdropUrl} from '../api';

function CustomHeader(props){
    const topMovieList = props.topMovies;

    return (
        !topMovieList ? null :
        <Navbar sticky='top' className='p-0'>
            {
                topMovieList.length <= 0 ? null :
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
                        {
                            topMovieList.map(movie => (
                                <div key={movie.id}>
                                    <img
                                        className="d-block w-100"
                                        style={{objectFit:'cover', objectPosition:'right center'}}
                                        src={getMovieBackdropUrl(movie.backdrop_path)}
                                        alt={movie.title + " Backdrop Image"}
                                        height={300}
                                    />
                                </div>
                            ))
                        }
                    </Carousel>
                    <div className='header-gradient'>
                        <div className='header-element'>
                            <h1> MovieList </h1>
                        </div>
                    </div>
                </div>
            }
        </Navbar>
    )
}

export default CustomHeader;