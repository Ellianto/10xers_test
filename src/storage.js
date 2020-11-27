export const getMyList = () => {
    let myMovieList = [];

    for(let ctr = 0; ctr < localStorage.length; ctr++){
        const myMovieData = localStorage.getItem(localStorage.key(ctr));

        if(myMovieData){
            myMovieList.push(JSON.parse(myMovieData));
        }
    }

    return myMovieList;
}

export const addToMyList = (movieData) => {
    const duplicateItem = localStorage.getItem(movieData.id);
    if(duplicateItem){
        return true;
    }

    localStorage.setItem(movieData.id, JSON.stringify(movieData));
    return false;
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