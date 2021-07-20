import React, { useState, useEffect} from 'react';

import { Label, Button, InputField } from '.';

const AddMovie = (props) => {

    const [movieTitle, setMovieTitle] = useState();
    const [movieReleaseDate, setMovieReleaseDate] = useState();
    const [movieGenre, setMovieGenre] = useState();
    const [moviePlot, setMoviePlot] = useState();
    const submitMovie = (e) => {
        e.preventDefault();

        let newMovie = {
            'title': movieTitle,
            'release_date': movieReleaseDate,
            'genre': movieGenre,
            'plot': moviePlot,
            'user': localStorage.getItem('username'),
            'ratings': []
        };

        props.submitMovie(newMovie, false);
        document.getElementById('new-movie-form').reset();

    }


    return(
        <div>
            <form action="" id='new-movie-form' onSubmit={submitMovie}
                className='flex flex-col items-center
                m-4 w-2/5'>
                <Label>Title</Label>
                <InputField required
                onChange={e => setMovieTitle(e.target.value)}>                    
                </InputField>

                <Label>Release Date </Label>
                <InputField type='date' required
                onChange={e => setMovieReleaseDate(e.target.value)}>
                </InputField>

                <Label>Genre</Label>
                <InputField required
                onChange={e => setMovieGenre(e.target.value)}>
                </InputField>
                
                <Label>Plot</Label>
                <textarea form='new-movie-form' required
                    name="plot" id="plot" cols="20" rows="3"
                    className='border-2 border-purple-400 
                    rounded-lg focus:outline-none p-2'
                    onChange={e => setMoviePlot(e.target.value)}>
                </textarea>

                <Button type='submit'
                    className='mt-3 self'>
                    Submit
                </Button>
            </form>

        </div>
    )
}

export default AddMovie;