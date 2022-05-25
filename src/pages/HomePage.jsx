import React from 'react';

import MovieList from '../components/movie/MovieList';

const HomePage = () => {
    return (
        <>
            
            {/* movie box container */}
            <section className="pb-20 mb-10 movies-layout page-container">
            <h2 className="mb-10 text-3xl font-bold text-white capitalize">Now playing</h2>
            <MovieList></MovieList>
            </section>
            {/* movie box container */}
            <section className="pb-20 mb-10 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold text-white capitalize">Top Rated</h2>
                <MovieList kind="movie" type="top_rated"></MovieList>
            </section>
                {/* movie box container */}
            <section className="pb-20 mb-10 movies-layout page-container">
                <h2 className="mb-10 text-3xl font-bold text-white capitalize">Trending</h2>
                <MovieList kind="movie" type="popular"></MovieList>
            </section>
            
        </>)
    
};

export default HomePage;