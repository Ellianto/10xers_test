import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import MovieList from './components/MovieList';
import { getGenres, getMovieBackdropUrl, getMovieListByGenre, getPopularMovies } from './api';
import { getMyList, addToMyList } from './storage';

function App() {
    const [listUpdated, setListUpdated] = useState(false);
    const [myList, setMyList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [apiMovieList, setAPIMovieList] = useState([]);
    const [topMovieList, setTopMovieList] = useState([]);

    //!On Component Mount
    useEffect(() => {
        const initialGenreFetch = async () => {
            setGenres(await getGenres());
        }

        const initialTop5MovieFetch = async () => {
            setTopMovieList(await getPopularMovies());
        }

        const initialMyMoviesFetch = () => {
            setMyList(getMyList());
        }

        initialGenreFetch();
        initialTop5MovieFetch();
        initialMyMoviesFetch();
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
        if(listUpdated){
            console.log("Test");
            setMyList(getMyList());
            setListUpdated(false);
        }
    }, [listUpdated]);

    return (
        <Container fluid={true}>
            <Row>
                <Col>
                    <Carousel
                        slide={true}
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
                                    <Carousel.Caption className="text-left align-middle">
                                        <h1>MovieList</h1>
                                    </Carousel.Caption>
                                </Carousel.Item>
                            ))
                        }
                    </Carousel>
                </Col>
            </Row>
            {
                // My Movie List
                <Row>
                    <Col className="mt-4 mb-4">
                        <MovieList 
                            movies={myList} 
                            genre={null} 
                            onHover={() => {
                                setListUpdated(true);
                            }}
                        />
                    </Col>
                </Row>
            }
            {
                apiMovieList.length <= 0 ? null :
                <Row>
                    <Col className="mt-4 mb-4">
                        <MovieList 
                            movies={apiMovieList[0].movies} 
                            genre={apiMovieList[0].genre} 
                            onClick={(movieData) => {
                                addToMyList(movieData);
                                setListUpdated(true);
                            }}
                        />
                    </Col>
                </Row>
            }
        </Container>
    );
}

export default App;
