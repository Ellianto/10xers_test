import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import MovieList from './components/MovieList';
import { getGenres, getMovieBackdropUrl, getMovieListByGenre, getPopularMovies } from './api';
import { getMyList } from './storage';

function App() {
    const [myList, setMyList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [apiMovieList, setAPIMovieList] = useState([]);
    const [topMovieList, setTopMovieList] = useState([]);

    //!Fetch genres and top 5 movies from APIs on page load
    useEffect(() => {
        const initialGenreFetch = async () => {
            setGenres(await getGenres());
        }

        const initialTop5MovieFetch = async () => {
            setTopMovieList(await getPopularMovies());
        }

        initialGenreFetch();
        initialTop5MovieFetch();
    }, []);

    //!Based on fetched genre, fetch the movies
    useEffect(() => {
        const fetchMovieLists = async () => {
            const movieLists = await Promise.all(genres.map(async genre => {
                return {
                    genre: genre.name,
                    movies: await getMovieListByGenre(genre.id),
                }
            }));

            setAPIMovieList(movieLists);
        }

        if(genres.length > 0){
            fetchMovieLists();
        }
    }, [genres])

    //!Fetch My Movie List from LocalStorage
    useEffect(() => {
        getMyList();
    }, []);

    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <Carousel
                        fade={true}
                        controls={false}
                        indicators={false}
                        pause={false}
                        touch={false}
                    >
                        {
                            topMovieList.length <= 0 ? null :
                            topMovieList.map(topMovie => (
                                <Carousel.Item key={topMovie.id}>
                                    <img
                                        className="d-block w-100"
                                        style={{objectFit:'cover'}}
                                        src={getMovieBackdropUrl(topMovie.backdrop_path)}
                                        alt={topMovie.title + " Backdrop Image"}
                                        height="320"
                                    />
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </Col>
            </Row>
            {/* Sample Movie List, Design it properly then foreach it */}
            {
                apiMovieList.length > 0 ?
                (
                    <Row>
                        <Col>
                            <MovieList movies={apiMovieList[0].movies} genre={apiMovieList[0].genre} />
                        </Col>
                    </Row>
                ) : null
            }
        </Container>
    );
}

export default App;
