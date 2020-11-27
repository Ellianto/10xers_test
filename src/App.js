import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from 'react-bootstrap/Navbar';

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

    // const CarouselRefWrapper = React.useRef((props, ref) => (
    //     <Carousel.Item ref={ref}>
    //         <img
    //             className="d-block w-100"
    //             style={{objectFit:'cover'}}
    //             src={getMovieBackdropUrl(props.movie.backdrop_path)}
    //             alt={props.movie.title + " Backdrop Image"}
    //             height={320}
    //         />
    //         <Carousel.Caption className="text-left align-middle">
    //             <h1>MovieList</h1>
    //         </Carousel.Caption>
    //     </Carousel.Item>
    // ))

    return (
        <>
            <Navbar sticky='top' className='p-0'>
                <Carousel
                    className="w-100 mx-auto"
                    controls={false}
                    indicators={false}
                >
                    {
                        topMovieList.length <= 0 ? null :
                        topMovieList.map(movie => (
                            <Carousel.Item key={movie.id}>
                                <img
                                    className="d-block w-100"
                                    style={{objectFit:'cover'}}
                                    src={getMovieBackdropUrl(movie.backdrop_path)}
                                    alt={movie.title + " Backdrop Image"}
                                    height={320}
                                />
                                <Carousel.Caption className="text-left align-middle">
                                    <h1>MovieList</h1>
                                </Carousel.Caption>
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
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
