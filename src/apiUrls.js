const host = 'http://127.0.0.1:8000';

const urls = {
    'getMovies': `${host}/movies/movies/`,
    'getMoviesAscDate': `${host}/movies/movies/get_movies_ascending_date/`,
    'getMoviesDescDate': `${host}/movies/movies/get_movies_descending_date/`,
    'login': `${host}/login/users/login/`,
    'usersUrl': `${host}/login/users/`
}

export default urls;