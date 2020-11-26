import CardDeck from 'react-bootstrap/CardDeck';
import MovieCard from './MovieCard';

function MovieList(props){
    return(
        <CardDeck>
            <MovieCard></MovieCard>
        </CardDeck>
    );
}

export default MovieList;