const getMyList = () => {
    let myMovieList = [];

    for(let ctr = 0; ctr < localStorage.length; ctr++){
        const myMovieData = localStorage.getItem(localStorage.key(ctr));
        myMovieList.push(JSON.parse(myMovieData));
    }

    return myMovieList;
}

const addToMyList = (movieData) => {
    const duplicateItem = localStorage.getItem(movieData.id);
    if(duplicateItem){
        return;
    }

    localStorage.setItem(movieData.id, JSON.stringify(movieData));
}

const removeFromMyList = (movieId) => {
    localStorage.removeItem(movieId);
    console.log("Removed movie with ID ", movieId);
}

exports.getMyList = getMyList;
exports.addToMyList = addToMyList;
exports.removeFromMyList = removeFromMyList;