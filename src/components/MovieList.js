import React from 'react';

import CardDeck from 'react-bootstrap/CardDeck';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MovieCard from './MovieCard';

function MovieList(props){
    return(
        <Container fluid={true}>
            <Row>
                <Col>
                    <h3> {props.genre ? `${props.genre} Movies` : ''} </h3>
                </Col>
            </Row>
            <Row> 
                <CardDeck style={{flexWrap: 'nowrap', overflow:'auto'}}>
                    {
                        !props.movies ? null :
                        props.movies.map(movie => (
                            <MovieCard 
                                key={movie.id}
                                movie={movie} 
                                onClick={() => {console.log(movie.id)}} 
                            />
                        ))
                    }
                </CardDeck>
            </Row>
        </Container>
    );
}

export default MovieList;