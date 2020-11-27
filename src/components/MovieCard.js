import React from 'react';

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {getMoviePosterUrl} from '../api';

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
                src={getMoviePosterUrl(movie.poster_path)} 
                alt={`${movie.title} Poster Image`} 
                height="420"/>
            {/* TODO:Swap with Card.ImgOverlay and add onHover fade in */}
            <Card.Body>
                <Card.Title>
                    {
                        movie.title.length > 25 ? movie.title.substr(0, 21)  + '...' : movie.title
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
        <Col xs={3} className="h-100">
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