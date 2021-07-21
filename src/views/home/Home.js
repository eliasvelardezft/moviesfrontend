import React, { useEffect, useState } from 'react';

import { Movie, MovieDetail, AddMovie, EditMovie, UserHeader } from '../../components';
import { get, patch, post, httpdelete } from '../../functions';
import urls from '../../apiUrls';


const Home = (props) => {

  const getUser = () => {
    get(`${urls.usersUrl}${localStorage.getItem('username')}`, localStorage.getItem('token'))
    .then(data => {
      setUser(data);
    })
  }

  const [user, setUser] = useState(localStorage.getItem('username'));
  useEffect(() => {
    getUser();
  }, [])
  const [token, setToken] = useState(localStorage.getItem('token'));

  const [movies, setMovies] = useState([]);
  const [sorting, setSorting] = useState('descDate')
  useEffect(() => {
    getMovies();
  }, [sorting])

  const [isDetail, setIsDetail] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState({});

  const seeMore = (movie) => {
    setIsDetail(pre => !pre);
    setSelectedMovie(movie);
    getMovies();
  }

  const getMovies = () => {
    get(urls.getMovies, token, { 'searchsort': sorting })
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
    setSorting(event.target.value);
  }

  const [addMovieModal, setAddMovieModal] = useState(false);
  const addMovie = () => {
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
    httpdelete(`${urls.getMovies}${m.id}/`, token)
      .then(res => {
        if(res.status === 204) {
          alert('movie succesfully deleted');
          getMovies();
        } else {
          alert('there was an error deleting the movie.');
        }
      })
  }

  const addToWatchList = (m) => {
    let movies_watchlist_ids = user.movies_watchlist.map(m => m.id)
    patch(`${urls.usersUrl}${user.username}/`, {
      'movies_watchlist': [...movies_watchlist_ids, m.id]
    })
      .then(data => {
        getUser();
      })
  }

  const removeMovieFromWatchlist = (m) => {
    let newMoviesWatchlistIds = user.movies_watchlist.map(movie => movie.id).filter(movie => movie !== m.id);
    patch(`${urls.usersUrl}${user.username}/`, {
      'movies_watchlist': [...newMoviesWatchlistIds]
    })
      .then(data => {
        getUser();
        console.log('hola');
      })
  }



  return (
    !isDetail 
    ? 
    <div className='flex flex-col relative h-screen m-0'>
      <UserHeader user={user} removeMovieFromWatchlist={removeMovieFromWatchlist}/>
      <div className='flex'>
        <h1 className='text-red-500e'>Movies</h1>
        <button onClick={addMovie} 
          className='mx-7 p-1 rounded-lg border-gray-200 bg-blue-300'>
          Add movie
        </button>
        <select name="sorting" id="sorting" onChange={sortMovies}>
          <option value="descDate">date descending</option>
          <option value="ascDate">date ascending</option>
          <option value="descRating">rating descending</option>
          <option value="ascRating">rating ascending</option>
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

          <table className='text-center'>
              <thead>
                <tr>
                  <th className='border-2 border-purple-300'>Title</th>
                  <th className='border-2 border-purple-300'>Release date</th>
                  <th className='border-2 border-purple-300'>Genre</th>
                  <th className='border-2 border-purple-300'>Average rating</th>
                  <th className='border-2 border-purple-300'>Edit</th>
                  <th className='border-2 border-purple-300'>Delete</th>
                  <th className='border-2 border-purple-300'>Watch later</th>
                  <th className='border-2 border-purple-300'>See more</th>
                </tr>
              </thead>
              <tbody>
                {
                  movies.map(m => {
                    {/* console.log(`m.user: ${m.user} ${user}`)
                    console.log(`ES?: ${m.title} ${m.user === user.username || m.user === null}`); */}
                    return(
                      <tr key={m.id}>
                        <td className='border-2 border-purple-300'>{m.title}</td>
                        <td className='border-2 border-purple-300'>{m.release_date}</td>
                        <td className='border-2 border-purple-300'>{m.genre}</td>
                        <td className='border-2 border-purple-300'>{m.average_rating}</td>
                        <td className='border-2 border-purple-300'>
                          <button onClick={() => editMovie(m)} 
                            className={`${m.user === user.username || m.user === null ? '' : 'hidden'}
                              mx-7 p-1 rounded-lg border-gray-200 bg-blue-300`}>
                            Edit
                          </button>
                        </td>
                        <td className='border-2 border-purple-300'>
                          <button onClick={() => deleteMovie(m)} 
                            className={` ${m.user === user.username || m.user === null ? '' : 'hidden'}
                            mx-7 p-1 rounded-lg border-gray-200 bg-blue-300`}>
                            Delete
                          </button>
                        </td>
                        <td className='border-2 border-purple-300'>
                          <button onClick={() => addToWatchList(m)}
                            className='mx-7 p-1 rounded-lg border-gray-200 bg-blue-300'>
                            watch later
                          </button>
                        </td>
                        <td className='border-2 border-purple-300'>
                          <button onClick={() => seeMore(m)}>See more!</button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>

      
      <div className='bottom-0'>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
    :
    <div className='flex flex-col relative'>
      <MovieDetail movie={selectedMovie}/>
      <div className='absolute bottom-0'>
        <button onClick={seeMore} 
          className='rounded-lg border-gray-200 bg-blue-300 absolute bottom-0'>
          Back!
        </button>
      </div>
    </div>
  )
}


export default Home;