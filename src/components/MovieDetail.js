import React, { useEffect, useState} from 'react';

import { Rating, AddRating } from '.';
import { post, patch, get } from '../functions';
import urls from '../apiUrls';


const MovieDetail = ({ movie }) => {

    const [ratings, setRatings] = useState(movie.ratings)
    const getRatings = () => {
        get(`${urls.getMovies}${movie.id}`, localStorage.getItem('token'))
            .then(res => {
                setRatings(res.ratings);
            })
    }
    useEffect(() => {
        getRatings();
    }, [movie])

    const submitRating = (rating) => {
        patch(`${urls.getMovies}${movie.id}/`, {
            'ratings': [...movie.ratings, rating]
        })
        .then(res => {
            getRatings();
            document.getElementById('add-rating-form').reset();
            document.getElementById('select-rating').value = 1;
        });
    }  

    return (
        <div className=''>
            <p>title: {movie.title}</p>
            <p>release date: {movie.release_date}</p>
            <p>genre: {movie.genre}</p>
            <p>plot: {movie.plot}</p>

            <AddRating submitRating={submitRating}/>

            <ul>
                {
                    ratings.map(r => {
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