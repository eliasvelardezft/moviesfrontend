const host = 'http://127.0.0.1:8000';
const herokuHost = 'https://nicamovies.herokuapp.com'

const urls = {
    'getMovies': `${herokuHost}/movies/movies/?=`,
    'getMoviesAscDate': `${herokuHost}/movies/movies/get_movies_ascending_date/`,
    'getMoviesDescDate': `${herokuHost}/movies/movies/get_movies_descending_date/`,
    'login': `${herokuHost}/login/users/login/`,
    'usersUrl': `${herokuHost}/login/users/`
}

export default urls;