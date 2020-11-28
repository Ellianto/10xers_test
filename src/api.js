import Joi from 'joi';

// Might want to use dotenv
const API_KEY = '9be5962f75cabd26c04eb4443674e0d2';
const BASE_API_URL = 'https://api.themoviedb.org/3';


export const movieSchema = Joi.object({
    title: Joi.string().required(),
    overview: Joi.string().required(),
    backdrop_path: Joi.alternatives().try(Joi.string(), Joi.optional())
}).unknown();

const moviesArrSchema = Joi.object({
    results: Joi.array().required().items(movieSchema)
}).unknown();

const genresArrSchema = Joi.object({
    genres: Joi.array().required().items({
        id: Joi.number().integer().required(),
        name: Joi.string().required(),
    })
}).unknown();

export const getGenres = async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
        const responseJSON = await response.json();
        const jsonValue = await genresArrSchema.validateAsync(responseJSON);
        return jsonValue.genres;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getMovieListByGenre = async (genreId) => {
    try {
        const genreIDSchema = Joi.number().required();
        const validatedGenreID = await genreIDSchema.validateAsync(genreId);

        const response = await fetch(`${BASE_API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&region=US&with_genres=${validatedGenreID}`);
        const responseJSON = await response.json();
        const jsonValue = await moviesArrSchema.validateAsync(responseJSON);
        return jsonValue.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Limits up to 20, because we are fetching one page at a time
export const getPopularMovies = async (limit=5) => {
    try {
        const countLimitSchema = Joi.number().min(0).max(20).default(5).required();
        const validatedLimit = await countLimitSchema.validateAsync(limit)

        const response = await fetch(`${BASE_API_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&region=US`);
        const responseJSON = await response.json();
        const jsonValue = await moviesArrSchema.validateAsync(responseJSON);
        return jsonValue.results.slice(0, validatedLimit);
    } catch (error) {
        console.error(error);
        return [];
    }
}

//Image configs available at the /configuration endpoint
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';
const posterSize = 'w342';
const smallBackdropSize = 'w300';
const largeBackdropSize = 'w1280';
const placeholderBackdrop = 'https://images.placeholders.dev/?width=300&height=170&text=Missing%20Backdrop'

// Currently Unused
export const getMoviePosterUrl = (posterPath) => {
    if(!posterPath){
        return placeholderBackdrop;
    }

    return `${BASE_IMAGE_URL}${posterSize}${posterPath}`;
}

export const getMovieBackdropUrl = (backdropPath, small = false) => {
    if(!backdropPath){
        return placeholderBackdrop;
    }

    if(small){
        return `${BASE_IMAGE_URL}${smallBackdropSize}${backdropPath}`;
    } else {
        return `${BASE_IMAGE_URL}${largeBackdropSize}${backdropPath}`;
    }
}
