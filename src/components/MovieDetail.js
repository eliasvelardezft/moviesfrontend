import React, { useEffect, useState} from 'react';
import { Rating } from '.';

const MovieDetail = ({ movie }) => {
    return (
        <div className=''>
            <p>{movie.title}</p>
            <p>{movie.author}</p>
            <p>{movie.genre}</p>
            <p>{movie.plot}</p>
        
            <ul>
                {
                    movie.ratings.map(r => {
                        console.log('RATING: ', r);
                        return (
                            <Rating key={r.id} rating={r} />
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default MovieDetail;