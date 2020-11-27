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
        return;
    }

    localStorage.setItem(movieData.id, JSON.stringify(movieData));
}

export const removeFromMyList = (movieId) => {
    localStorage.removeItem(movieId);
    console.log("Removed movie with ID ", movieId);
}