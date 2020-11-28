import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import MovieList from './components/MovieList';
import CustomHeader from './components/CustomHeader';

import { getGenres, getMovieListByGenre, getPopularMovies } from './api';
import { getMyList } from './storage';

function App() {
    const [listUpdated, setListUpdated] = useState(true);
    const [genres, setGenres] = useState([]);
    const [savedMovieList, setSavedMovieList] = useState([]);
    const [apiMovieList, setAPIMovieList] = useState([]);
    const [topMovieList, setTopMovieList] = useState([]);

    //!On Component Mount
    useEffect(() => {
        const initialFetches = async () => {
            // Fetch Genre
            setGenres(await getGenres());

            // Fetch Popular Movies for Carousel
            setTopMovieList(await getPopularMovies());
        }

        initialFetches();
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
    }, [genres]);

    useEffect(() => {
        if(listUpdated){
            setSavedMovieList(getMyList());
            setListUpdated(false);
        }
    }, [listUpdated]);

    const renderAPIMovieList = () => apiMovieList.map(apiMovie => (
        <Row key={`genre-${apiMovie.genre}`}>
            <Col className="mt-4 mb-4">
                <MovieList 
                    movies={apiMovie.movies} 
                    genre={apiMovie.genre} 
                    onClick={() => {setListUpdated(true)}}
                />
            </Col>
        </Row>
    ));

    return (
        <>
            <CustomHeader topMovies={topMovieList} />
            <Container fluid={true}>
                <Row>
                    <Col className="mt-4 mb-4">
                        <MovieList 
                            movies={savedMovieList} 
                            genre={null} 
                            onHover={() => {setListUpdated(true)}}
                        />
                    </Col>
                </Row>
                {
                    apiMovieList.length <= 0 ? null : renderAPIMovieList()
                }
            </Container>
        </>
    );
}

export default App;
