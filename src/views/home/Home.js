import React, { useEffect, useState } from 'react';

import { Movie, MovieDetail, AddMovie, EditMovie } from '../../components';
import { get, patch, post, httpdelete } from '../../functions';
import urls from '../../apiUrls';


const Home = (props) => {
  const [movies, setMovies] = useState([]);
  const [moviesUrl, setMoviesUrl] = useState([urls['getMovies']])
  useEffect(() => {
    getMovies();
  }, [moviesUrl])

  const [isDetail, setIsDetail] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const seeMore = (movie) => {
    setIsDetail(pre => !pre);
    setSelectedMovie(movie);
  }

  const getMovies = () => {
    get(moviesUrl, localStorage.getItem('token'))
    .then(data => {
      setMovies(data);
      console.log('DATA: ', data);
    })
  }

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    props.history.push('/')
  }

  const sortMovies = (event) => {
    console.log('SORTING: ', event.target.value);
    setMoviesUrl(urls[`${event.target.value}`]);
  }

  const [addMovieModal, setAddMovieModal] = useState(false);
  const addMovie = () => {
    console.log('adding movie!');
    setAddMovieModal(prev => !prev);
  }

  const submitMovie = (movie, isEdit) => {
    if (!isEdit) {
      post(urls.getMovies, movie)
        .then(res => {
          if(res.id) {
            alert('Movie succesfully added.');
            getMovies();
          } else {
            alert('There was an error adding the movie.');
          }
        })      
    } else {
      patch(`${urls.getMovies}${selectedMovie.id}/`, movie)
        .then(res => {
          if(res.id) {
            alert('Movie succesfully edited.');
            getMovies();
          } else {
            alert('There was an error editing the movie.');
          }
        });
    }
  }
  const [editMovieModal, setEditMovieModal] = useState(false)
  const editMovie = (movie) => {
    setSelectedMovie(movie);
    setEditMovieModal(prev => !prev);
  }
  const deleteMovie = (m) => {
    console.log('deleting movie!', m);
    httpdelete(`${urls.getMovies}${m.id}/`, localStorage.getItem('token'))
      .then(res => {
        if(res.status === 204) {
          alert('movie succesfully deleted');
          getMovies();
        } else {
          alert('there was an error deleting the movie.');
        }
      })
  }



  return (
    !isDetail 
    ? 
    <div className='flex flex-col relative h-screen m-0'>
      <div className='flex'>
        <h1 className='text-red-500e'>Movies</h1>
        <button onClick={addMovie} 
          className='mx-7 p-1 rounded-lg border-gray-200 bg-blue-300'>
          Add movie
        </button>
        <select name="sorting" id="sorting" onChange={sortMovies}>
          <option value="getMoviesAscDate">date ascending</option>
          <option value="getMoviesDescDate">date descending</option>
          {/* <option value="ratingAsc">rating ascending</option>
          <option value="ratingDesc">rating descending</option> */}
        </select>
      </div>
      {
          addMovieModal
          ?
          <AddMovie submitMovie={submitMovie} movie={selectedMovie}/>
          :
          editMovieModal
          ?
          <EditMovie submitMovie={submitMovie} movie={selectedMovie}/>
          :
          null
      }
      <ul>
        {
          movies.map(m => {
            return (
              <div key={m.id} className='flex justify-between'>
                <li className='flex justify-between'>
                  <Movie movie={m}/>
                </li>
                <button onClick={() => editMovie(m)} 
                  className='mx-7 p-1 rounded-lg border-gray-200 bg-blue-300'>
                  Edit
                </button>
                <button onClick={() => deleteMovie(m)} 
                  className='mx-7 p-1 rounded-lg border-gray-200 bg-blue-300'>
                  Delete
                </button>
                <button onClick={() => seeMore(m)}>See more!</button>
              </div>
            )
          })
        }
      </ul>
      
      <div className='absolute bottom-0'>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
    :
    <div className='flex flex-col'>
      <h1>Hola!</h1>
      <MovieDetail movie={selectedMovie}/>
      <div className='absolute bottom-0'>
        <button onClick={seeMore} 
          className='rounded-lg border-gray-200 bg-blue-300'>
          Back!
        </button>
      </div>
    </div>
  )
}


export default Home;