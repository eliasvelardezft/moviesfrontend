import React, { useState, useEffect} from 'react';

import { Label, Button, InputField } from '.';

const EditMovie = (props) => {

    const [movieTitle, setMovieTitle] = useState(props.movie.title);
    const [movieReleaseDate, setMovieReleaseDate] = useState(props.movie.release_date);
    const [movieGenre, setMovieGenre] = useState(props.movie.genre);
    const [moviePlot, setMoviePlot] = useState(props.movie.plot);
    const submitMovie = (e) => {
        e.preventDefault();

        let newMovie = {
            'title': movieTitle,
            'release_date': movieReleaseDate,
            'genre': movieGenre,
            'plot': moviePlot
        };

        console.log(newMovie);

        props.submitMovie(newMovie, true);
        document.getElementById('edit-movie-form').reset();

    }

    let movie = props.movie
    return(
        <div>
            <form action="" id='edit-movie-form' onSubmit={submitMovie}
                className='flex flex-col items-center
                m-4 w-2/5'>
                <Label>Title</Label>
                <InputField required
                value={movieTitle}
                onChange={e => setMovieTitle(e.target.value)}>                    
                </InputField>

                <Label>Release Date </Label>
                <InputField type='date' required
                value={movieReleaseDate}
                onChange={e => setMovieReleaseDate(e.target.value)}>
                </InputField>

                <Label>Genre</Label>
                <InputField required
                value={movieGenre}
                onChange={e => setMovieGenre(e.target.value)}>
                </InputField>
                
                <Label>Plot</Label>
                <textarea form='new-movie-form' required
                    name="plot" id="plot" cols="20" rows="3"
                    value={moviePlot}
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

export default EditMovie;