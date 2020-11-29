import {movieSchema} from './api'

export const getMyList = () => {
    let myMovieList = [];

    for(let ctr = 0; ctr < localStorage.length; ctr++){
        const myMovieData = localStorage.getItem(localStorage.key(ctr));

        if(myMovieData){
            try {
                const parsedJSON = JSON.parse(myMovieData);
                
                const {error, value} = movieSchema.validate(parsedJSON);
                
                if(error){
                    throw error;
                }

                myMovieList.push(value);
            } catch (error) {
                console.error(error);
            }
        }
    }

    return myMovieList;
}

export const addToMyList = (movieData) => {
    const duplicateItem = localStorage.getItem(movieData.id);

    if(duplicateItem){
        return true;
    }

    try {
        const {error, value} = movieSchema.validate(movieData);

        if(error){
            throw error;
        }

        localStorage.setItem(value.id, JSON.stringify(value));
        return false;
    } catch (error) {
        console.error(error);
        return true;
    }
}

export const removeFromMyList = (movieId) => {
    localStorage.removeItem(movieId);

    if(!localStorage.getItem(movieId)){
        console.log("Removed movie with ID ", movieId);
        return true;
    } 
    
    console.log("Failed to remove movie!");
    return false;
}