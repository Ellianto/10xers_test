import React from 'react';

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {getMovieBackdropUrl} from '../api';

// Clampy seems buggy on development (crashes on window size change)
// TODO: Check on production, or look for alternatives/solution
import Clampy from '@clampy-js/react-clampy'
import { removeFromMyList } from '../storage';

function MovieCard(props){
    const movie = props.movie;

    const onClickCardElement = () => {
        if(props.onClick){
            props.onClick(movie);
        }
    }

    const cardElement = (
        <Card onClick={onClickCardElement}>
            <Card.Img 
                variant='top' 
                src={getMovieBackdropUrl(movie.backdrop_path, true)} 
                alt={`${movie.title} Poster Image`} 
                width="300"/>
            {/* TODO:Swap with Card.ImgOverlay and add onHover fade in */}
            <Card.Body>
                <Card.Title>
                    {
                        movie.title.length > 22 ? movie.title.substr(0, 20)  + '...' : movie.title
                    }
                </Card.Title>
                <Card.Text as="div">
                    {
                        movie.overview.length > 90 ? movie.overview.substr(0, 87) + '...' : movie.overview
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );

    const onDeleteButtonClick = () => {
        if(props.onHover){
            removeFromMyList(movie.id);
            props.onHover();
        }
    }
    const renderDeleteButton = (props) => (
        <Tooltip placement='auto' {...props}>
            <Button
                variant="danger"
                size="lg"
                onClick={onDeleteButtonClick}
            >
                Delete
            </Button>
        </Tooltip>
    )

    return(
        !movie ? null :
        <Col xs={10} sm={5} md={3} className="h-100">
            {
                !props.onHover ? cardElement :
                <OverlayTrigger
                    placement='auto'
                    delay={{show: 150, hide: 800}}
                    overlay={renderDeleteButton}
                >
                    {cardElement}
                </OverlayTrigger>
            }
            
        </Col>
    );
}

export default MovieCard;