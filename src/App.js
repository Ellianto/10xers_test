import React, { useEffect, useState } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import MovieList from './components/MovieList';

function App() {
    const [myList, setMyList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [apiMovieList, setAPIMovieList] = useState([]);

    //!Fetch data from APIs on page load
    useEffect(() => {

    }, []);

    //!Fetch My Movie List from LocalStorage
    useEffect(() => {

    }, []);

    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <Carousel></Carousel>
                </Col>
            </Row>
            {/* Sample Movie List, Design it properlu then foreach it */}
            <Row>
                <Col>
                    <MovieList></MovieList>
                </Col>
            </Row>
        </Container>
    );
}

export default App;
