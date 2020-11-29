import React from 'react';

import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import {getMovieBackdropUrl} from '../api';

// Clampy seems buggy on development (crashes on window size change)
// Should look for alternatives/solution
// import Clampy from '@clampy-js/react-clampy'

import { removeFromMyList, addToMyList } from '../storage';
import swal from 'sweetalert';

function MovieCard(props){
    const movie = props.movie;

    // Save to Local Storage on Click
    const onClickCardElement = () => {
        if(!props.onClick){
            return;
        }

        // Confirm Save Swal
        swal({
            title: 'Confirm Save to My Movie List',
            text: 'Are you sure you want to save this movie to My Movie List?',
            icon: 'info',
            buttons: true,
        }).then(userConfirm => {
            if(!userConfirm){
                return;
            } 
            
            const exists = addToMyList(movie);
            props.onClick();

            // Confirmation swal
            const successSwalConfig = {
                title: 'Saved to My Movie List',
                icon: 'success',
                timer: 2000,
            }

            const duplicateSwalConfig = {
                title: 'You have already saved this movie!',
                icon: 'error',
                timer: 2000,
            }

            swal(exists ? duplicateSwalConfig : successSwalConfig);
        });
    }

    const cardElement = (
        <Card onClick={onClickCardElement}>
            <Card.Img 
                variant='top' 
                src={getMovieBackdropUrl(movie.backdrop_path, true)} 
                alt={`${movie.title} Poster Image`} 
                width="300"/>
            <Card.Body>
                <Card.Title className="text-truncate">
                    {movie.title}
                </Card.Title>
                <Card.Text className="text-justify">
                    {
                        movie.overview.length > 90 ? movie.overview.substr(0, 87) + '...' : movie.overview
                    }
                </Card.Text>
            </Card.Body>
        </Card>
    );

    // Remove from Local Storage on Delete Button CLick
    const onDeleteButtonClick = () => {
        if(!props.onHover){
            return;
        }

        swal({
            title: 'Confirm Delete from My Movie List',
            text: 'Are you sure you want to remove this movie from My Movie List?',
            icon: 'warning',
            buttons: true,
            dangerMode: true,
        }).then(userConfirm => {
            if(!userConfirm){
                return;
            }

            const success = removeFromMyList(movie.id);
            props.onHover();

            // Confirmation swal
            const successSwalConfig = {
                title: 'Removed From My Movie List',
                icon: 'success',
                timer: 2000,
            }

            const failedSwalConfig = {
                title: 'Failed to remove from My Movie List!',
                icon: 'error',
                timer: 2000,
            }

            swal(success ? successSwalConfig : failedSwalConfig);
        });
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
        <Col xs={10} sm={5} md={3} className="mb-4 align-items-stretch d-flex">
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