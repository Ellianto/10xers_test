// Reference: https://react-testing-examples.com/jest-rtl/

import React from 'react';
import { render, waitFor, fireEvent, screen, cleanup } from '@testing-library/react';

import MovieCard from './MovieCard';

// Only including required attributes of the JSON
const dummyMovie = {
    id: 1000,
    title: 'Dummy Short Title',
    overview: 'Dummy Short Overview',
    backdrop_path: null,
}

it('renders movie data', async () => {
    const { getByText } = render(<MovieCard movie={dummyMovie} />);

    // Make sure title is rendered
    await waitFor(() => getByText(/dummy short title/i));

    // Make sure overview is rendered
    await waitFor(() => getByText(/dummy short overview/i));

    cleanup();
});

it('shows dialog popup onClick', async () => {
    const dummyOnClick = jest.fn();
    const {getByText} = render(<MovieCard movie={dummyMovie} onClick={dummyOnClick}/>);
    
    // Clicks on Movie Title
    await waitFor(() => getByText(/dummy short title/i));
    fireEvent.click(getByText(/dummy short title/i));

    // Makes sure a dialog pops up
    await waitFor(() => screen.getByRole('dialog'));

    cleanup();
});

it('shows tooltip onHover', async () => {
    const dummyOnHover = jest.fn();
    const {getByText} = render(<MovieCard movie={dummyMovie} onHover={dummyOnHover} />);

    // Hovers Movie Title
    await waitFor(() => {getByText(/dummy short title/i)});
    fireEvent.mouseEnter(getByText(/dummy short title/i));

    // Make sure a tooltip pops up
    await waitFor(() => screen.getByRole('tooltip'));

    cleanup();
});