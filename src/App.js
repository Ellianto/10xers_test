import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import {Carousel} from 'react-responsive-carousel';

import MovieList from './components/MovieList';
import { getGenres, getMovieBackdropUrl, getMovieListByGenre, getPopularMovies } from './api.js';
import { getMyList, addToMyList } from './storage.js';

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
            setMyList(getMyList());
            setListUpdated(false);
        }
    }, [listUpdated]);

    return (
        <>
            <Navbar sticky='top' className='p-0'>
                {
                    topMovieList.length <= 0 ? null :
                    <div className='header-container'>
                        <Carousel
                            autoPlay={true}
                            infiniteLoop={true}
                            showArrows={false}
                            showIndicators={false}
                            showStatus={false}
                            showThumbs={false}
                            stopOnHover={false}
                            swipable={false}
                        >
                            {
                                topMovieList.map(movie => (
                                    <div key={movie.id}>
                                        <img
                                            className="d-block w-100"
                                            style={{objectFit:'cover', objectPosition:'right center'}}
                                            src={getMovieBackdropUrl(movie.backdrop_path)}
                                            alt={movie.title + " Backdrop Image"}
                                            height={300}
                                        />
                                    </div>
                                ))
                            }
                        </Carousel>
                        <div className='header-gradient'>
                            <div className='header-element'>
                                <h1> MovieList </h1>
                            </div>
                        </div>
                    </div>
                }
            </Navbar>
            <Container fluid={true}>
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
                    apiMovieList.map(apiMovie => (
                        <Row key={`genre-${apiMovie.genre}`}>
                            <Col className="mt-4 mb-4">
                                <MovieList 
                                    movies={apiMovie.movies} 
                                    genre={apiMovie.genre} 
                                    onClick={(movieData) => {
                                        addToMyList(movieData);
                                        setListUpdated(true);
                                    }}
                                />
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </>
    );
}

export default App;
