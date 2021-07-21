import React from "react";

const Movie = (props) => {
    let movie = props.movie;
    return (
        <div className='flex justify-around'>
            <p>id: {movie.id}</p>
            <p>release date: {movie.release_date}</p>
            <p>rating: {movie.average_rating}</p>
            
            {/* <p>{movie.id}</p>
            <p className='p-2'>{movie.title}</p>
            <p className='p-2'>{movie.genre}</p>
            <p className='p-2'>Avg rating: {movie.average_rating}</p> */}
        </div>
    )
}

export default Movie;