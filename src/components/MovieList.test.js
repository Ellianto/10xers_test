import React from 'react';
import { render, waitFor, cleanup } from '@testing-library/react';

import MovieList from './MovieList';

const dummyGenre = 'Horror';
const dummyMovieList = [
    {
        id: 1000,
        title: 'Dummy Short Title',
        overview: 'Dummy Short Overview',
        backdrop_path: null,
    }
];

it('renders genre properly', async () => {
    const {getByText} = render(<MovieList movies={dummyMovieList} genre={dummyGenre} />);

    //Renders genre properly
    await waitFor(() => getByText(/Horror Movies/i));
});

it('renders properly with missing genre', async () => {
    const {getByText} = render(<MovieList movies={dummyMovieList} genre={null} />);

    //Renders My Movie List for null genre
    await waitFor(() => getByText(/My Movies List/i));
});

it('renders properly with empty genre', async () => {
    const {getByText} = render(<MovieList movies={dummyMovieList} genre={''} />);

    //Renders My Movie List for null genre
    await waitFor(() => getByText(/Movies/i));
});

it('renders MovieCard', async () => {
    const {getByText} = render(<MovieList movies={dummyMovieList} genre={dummyGenre} />);

    // Renders Movie Card properly
    await waitFor(() => getByText(/dummy short title/i));
});

it('renders placeholder text on empty movies', async () => {
    const {getByText} = render(<MovieList movies={[]} genre={dummyGenre} />);
    
    // Renders placeholder text if movies is empty
    await waitFor(() => getByText(/nothing to see here/i));
});

it('renders placeholder text on null movies', async () => {
    const {getByText} = render(<MovieList movies={null} genre={dummyGenre} />);
    
    // Renders placeholder text if movies is empty
    await waitFor(() => getByText(/nothing to see here/i));
});