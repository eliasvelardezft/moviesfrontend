import React, { useEffect, useState } from 'react';

import { MovieDetail, AddMovie, EditMovie, UserHeader, Button } from '../../components';
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
  
  const [pages, setPages] = useState(1);
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

  const [selectedPage, setSelectedPage] = useState(1); 
  const changePage = (page) => {
    getMovies(page);
    setSelectedPage(page);
  }

  const getMovies = (page='') => {
    if(page) {
      page = `&page=${page}`
    }
    get(`${urls.getMovies}${page}`, token, { 'searchsort': sorting })
    .then(data => {
      setMovies(data.results);
      setPages(Math.ceil(data.count/5));
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
  const [addMovieModal, setAddMovieModal] = useState(false);
  const addMovie = () => {
    setEditMovieModal(false);
    setAddMovieModal(prev => !prev);
  }

  const [editMovieModal, setEditMovieModal] = useState(false)
  const editMovie = (movie) => {
    setSelectedMovie(movie);
    setEditMovieModal(prev => !prev);
    setAddMovieModal(false);
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
      })
  }



  return (
    !isDetail 
    ? 
    <div
      className='min-h-screen relative
        backdrop-filter backdrop-blur-xl 
        bg-opacity-40 flex flex-col'>
      <UserHeader user={user} removeMovieFromWatchlist={removeMovieFromWatchlist}/>
      <Button onClick={addMovie} className='mx-2 self-start' color='rgb(80, 142, 242)'>
        Add movie
      </Button>
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
      <div className='flex'>
        <h1 className='text-xl mx-4 my-2'>Movies</h1>
        <select name="sorting" id="sorting" onChange={sortMovies}>
          <option value="descDate">date descending</option>
          <option value="ascDate">date ascending</option>
          <option value="descRating">rating descending</option>
          <option value="ascRating">rating ascending</option>
        </select>
      </div>

          <table className='text-center mx-4 border-separate spacing'>
              <thead>
                <tr className='bg-purple-100'>
                  <th className='rounded-l-lg'>Title</th>
                  <th>Release date</th>
                  <th>Genre</th>
                  <th>Average rating</th>
                  <th>Edit</th>
                  <th>Delete</th>
                  <th>Watch later</th>
                  <th className='rounded-r-lg'>See more</th>
                </tr>
              </thead>
              <tbody>
                {
                  movies.map((m, index) => {
                    let bgColor = (index % 2 === 0) ? 'bg-yellow-200' : 'bg-purple-200';
                    return(
                      <tr key={m.id} className={bgColor}>
                        <td className='rounded-l-lg'>{m.title}</td>
                        <td>{m.release_date}</td>
                        <td>{m.genre}</td>
                        <td>{m.average_rating}</td>
                        <td>
                          <Button onClick={() => editMovie(m)} color='rgb(80, 142, 242)'
                            className={`${m.user === user.username || m.user === null ? '' : 'hidden'}`}>
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => deleteMovie(m)} color='rgb(237, 88, 88)'
                            className={` ${m.user === user.username || m.user === null ? '' : 'hidden'}`}>
                            Delete
                          </Button>
                        </td>
                        <td>
                          <Button onClick={() => addToWatchList(m)} color='rgb(240, 157, 79)'> 
                            watch later
                          </Button>
                        </td>
                        <td className='rounded-r-lg'>
                          <Button onClick={() => seeMore(m)} color='rgb(69, 204, 90)'>
                            See more!
                          </Button>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
          </table>

      <footer className='absolute bottom-0 flex flex-col self-center items-center justify-center mb-5'>
        <div className='mb-4'>
          <ul className='flex justify-center'>
            {
              [...new Array(pages)].map((p, i) => {
                return(
                  <li key={i} className='mx-4'>
                    <button onClick={() => changePage(i+1)}
                      className={`underline hover:no-underline ${i+1 === selectedPage ? 'text-red-500' : 'text-purple-500'}`}>
                      {i+1}
                    </button>
                  </li>
                )
              })
            }
          </ul>
        </div>

        <div className='bottom-0'>
          <Button onClick={logout} color='rgb(237, 88, 88)'>
            Logout
          </Button>
        </div>
      </footer>
    </div>
    :
    <div className='flex flex-col relative'>
      <MovieDetail m={selectedMovie}/>
      <div className='absolute bottom-0'>
        <Button onClick={seeMore} 
          className='rounded-lg border-gray-200 bg-blue-300 absolute bottom-0'>
          Back!
        </Button>
      </div>
    </div>
  )
}


export default Home;