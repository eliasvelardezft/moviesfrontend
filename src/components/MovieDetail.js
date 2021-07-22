import React, { useEffect, useState} from 'react';

import { Rating, AddRating } from '.';
import { post, patch, get } from '../functions';
import urls from '../apiUrls';


const MovieDetail = ({ m }) => {

    const [movie, setMovie] = useState(m);
    const getMovie = () => {
        get(`${urls.getMovies}${movie.id}/`, localStorage.getItem('token'))
            .then(data => {
                setMovie(data);
            })
    }
    useEffect(() => {
        getMovie();
    }, [m])

    const [ratings, setRatings] = useState(movie.ratings)
    const getRatings = () => {
        get(`${urls.getMovies}${movie.id}`, localStorage.getItem('token'))
            .then(res => {
                setRatings(res.ratings);
            })
    }
    useEffect(() => {
        getRatings();
    }, [m])

    const submitRating = (rating) => {
        patch(`${urls.getMovies}${movie.id}/`, {
            'ratings': [...movie.ratings, rating]
        })
        .then(res => {
            getRatings();
            getMovie();
            document.getElementById('add-rating-form').reset();
            document.getElementById('select-rating').value = 1;
        });
    }  

    return (
        <div className='flex flex-col m-10'>
            <div className='bg-purple-300 rounded-lg p-6 w-1/2 mx-auto'>
                <h1 className='text-4xl font-bold text-center mb-6'>
                    {movie.title}
                </h1>
                <p>release date: {movie.release_date}</p>
                <p>genre: {movie.genre}</p>
                <p>plot: {movie.plot}</p>
            </div>

            <AddRating submitRating={submitRating}/>

            <table className='text-center mx-4 border-separate spacing'>
                <tbody>
                    {
                        ratings.map((r, index) => {
                            return(
                                <Rating key={index} rating={r} index={index}/>
                            )
                        })
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default MovieDetail;