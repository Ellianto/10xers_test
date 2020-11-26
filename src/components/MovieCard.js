import React from 'react';

import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import {getMoviePosterUrl} from '../api';

function MovieCard(props){
    const movie = props.movie;

    return(
        !movie ? null :
        <Col xs={3}>
            <Card>
                <Card.Img src={getMoviePosterUrl(movie.poster_path)} alt={`${movie.title} Poster Image`} />
                {/* TODO:Swap with Card.ImgOverlay and add onHover fade in */}
                <Card.Body>
                    <Card.Title>
                        {movie.title}
                    </Card.Title>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default MovieCard;