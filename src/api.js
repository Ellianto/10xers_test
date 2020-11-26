//TODO: Use dotenv later
const API_KEY = '9be5962f75cabd26c04eb4443674e0d2';
const BASE_URL = 'https://api.themoviedb.org/3';


const getGenres = async () => {
    // console.log("Hello World");
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const responseJSON = await response.json();
    return responseJSON.genres;
}

const getMovieListByGenre = async (genreId) => {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&region=US&with_genres=${genreId}`);
    const responseJSON = await response.json();
    return responseJSON.results;
}

exports.getGenres = getGenres;
exports.getMovieListByGenre = getMovieListByGenre;