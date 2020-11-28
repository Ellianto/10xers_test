import React from 'react';
import {render, waitFor, cleanup} from '@testing-library/react';

import CustomHeader from './CustomHeader';

const dummyTopMovies = [
    {
        id: 1000,
        title: 'Dummy Title',
        backdrop_path: null,
    }
];

it('renders title and img tags', async () => {
    const {getByText, getAllByAltText} = render(<CustomHeader topMovies={dummyTopMovies} />)

    // Make sure the header renders
    await waitFor(() => getByText(/movielist/i));
    
    // Makue sure the image tag(s) renders
    await waitFor(() => getAllByAltText(/dummy title/i));
    // Infinite Loop Carousel will duplicate some images

    cleanup();
});
