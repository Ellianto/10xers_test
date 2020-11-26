import React from 'react';

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import {getMoviePosterUrl} from '../api';

import Clampy from '@clampy-js/react-clampy'

function MovieCard(props){
    const movie = props.movie;

    return(
        !movie ? null :
        <Col xs={3} className="h-100">
            <Card onClick={props.onClick ? props.onClick : null}>
                <Card.Img 
                    variant='top' 
                    src={getMoviePosterUrl(movie.poster_path)} 
                    alt={`${movie.title} Poster Image`} 
                    height="420"/>
                {/* TODO:Swap with Card.ImgOverlay and add onHover fade in */}
                <Card.Body>
                    <Card.Title>
                        <Clampy clampSize="1">
                            {
                                movie.title.length > 30 ? movie.title.substr(0, 26)  + '...' : movie.title
                            }
                        </Clampy>
                    </Card.Title>
                    <Card.Text as="div">
                        <Clampy clampSize="3">
                            {
                                movie.overview
                            }
                        </Clampy>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default MovieCard;