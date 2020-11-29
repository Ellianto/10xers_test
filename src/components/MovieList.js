import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MovieCard from './MovieCard';

function MovieList(props){
    return(
        <Container fluid={true}>
            <Row>
                <Col xs={12} md={3} className="h-100">
                    <h3> {props.genre ? `${props.genre} Movies` : 'My Movies List'} </h3>
                </Col>
            </Row>
            <Row style={{flexWrap: 'nowrap', overflow:'scroll hidden'}}> 
                {
                    !props.movies || props.movies.length <= 0 ? 
                    <Col xs={12}>
                        <h5 className='text-center'> Nothing to see here! Scroll to discover more... </h5>
                    </Col>
                    :
                    props.movies.map(movie => (
                        <MovieCard
                            key={movie.id}
                            movie={movie} 
                            onClick={props.onClick ? props.onClick : null} 
                            onHover={props.onHover ? props.onHover : null}
                        />
                    ))
                }
            </Row>
        </Container>
    );
}

export default MovieList;