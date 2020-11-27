//TODO: Use dotenv later
const API_KEY = '9be5962f75cabd26c04eb4443674e0d2';
const BASE_API_URL = 'https://api.themoviedb.org/3';

const getGenres = async () => {
    // console.log("Hello World");
    const response = await fetch(`${BASE_API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const responseJSON = await response.json();
    return responseJSON.genres;
}

const getMovieListByGenre = async (genreId) => {
    const response = await fetch(`${BASE_API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&region=US&with_genres=${genreId}`);
    const responseJSON = await response.json();
    return responseJSON.results;
}

const getPopularMovies = async (limit=5) => {
    const response = await fetch(`${BASE_API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&region=US`);
    const responseJSON = await response.json();
    return responseJSON.results.slice(0, 5);
}

//Image configs available at the /configuration endpoint
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const posterSize = 'w342';
const smallBackdropSize = 'w300';
const largeBackdropSize = 'w1280';
const getMoviePosterUrl = (posterPath) => {
    return `${BASE_IMAGE_URL}${posterSize}${posterPath}`;
}

const getMovieBackdropUrl = (backdropPath, small = false) => {
    if(!backdropPath){
        return 'https://images.placeholders.dev/?width=300&height=170&text=Missing%20Backdrop';
    }

    if(small){
        return `${BASE_IMAGE_URL}${smallBackdropSize}${backdropPath}`;
    } else {
        return `${BASE_IMAGE_URL}${largeBackdropSize}${backdropPath}`;
    }
}

exports.getGenres = getGenres;
exports.getMovieListByGenre = getMovieListByGenre;
exports.getPopularMovies = getPopularMovies;
exports.getMoviePosterUrl = getMoviePosterUrl;
exports.getMovieBackdropUrl = getMovieBackdropUrl;