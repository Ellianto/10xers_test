import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import './MovieList.css';

import {CSSTransition, TransitionGroup} from 'react-transition-group'
import MovieCard from './MovieCard';

function MovieList(props){
    return(
        <Container fluid={true}>
            <Row>
                <Col xs={12} md={3} className="h-100">
                    <h3> {props.genre ? `${props.genre} Movies` : 'My Movies List'} </h3>
                </Col>
            </Row>
            <SimpleBar>
                <Row style={{flexWrap:'nowrap'}}>
                    {
                        !props.movies || props.movies.length <= 0 ? 
                        <Col xs={12}>
                            <h5 className='text-center'> Nothing to see here! Scroll to discover more... </h5>
                        </Col>
                        :
                        <TransitionGroup component={null}>
                            {
                                props.movies.map(movie => (
                                    <CSSTransition
                                        key={movie.id}
                                        timeout={1000}
                                        classNames='movie-card'
                                    >
                                        <MovieCard
                                            movie={movie} 
                                            onClick={props.onClick ? props.onClick : null} 
                                            onHover={props.onHover ? props.onHover : null}
                                        />
                                    </CSSTransition>
                                ))
                            }
                        </TransitionGroup>
                        
                    }
                </Row>
            </SimpleBar>
        </Container>
    );
}

export default MovieList;