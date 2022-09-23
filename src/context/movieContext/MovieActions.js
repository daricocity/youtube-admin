// UPDATE MOVIE ACTION
const updateMovieStart = () => ({
    type: 'UPDATE_MOVIE_START'
});

const updateMovieSuccess = (movie) => ({
    type: 'UPDATE_MOVIE_SUCCESS',
    payload: movie
});

const updateMovieFailure = () => ({
    type: 'UPDATE_MOVIE_FAILURE'
});

// DELETE MOVIE ACTION
const deleteMovieStart = () => ({
    type: 'DELETE_MOVIE_START'
});

const deleteMovieSuccess = (id) => ({
    type: 'DELETE_MOVIE_SUCCESS',
    payload: id
});

const deleteMovieFailure = () => ({
    type: 'DELETE_MOVIE_FAILURE'
});

// GET MOVIES ACTION
const getMoviesStart = () => ({
    type: 'GET_MOVIES_START'
});

const getMoviesSuccess = (movies) => ({
    type: 'GET_MOVIES_SUCCESS',
    payload: movies
});

const getMoviesFailure = () => ({
    type: 'GET_MOVIES_FAILURE'
});

// CREATE MOVIE ACTION
const createMovieStart = () => ({
    type: 'CREATE_MOVIE_START'
});

const createMovieSuccess = (movie) => ({
    type: 'CREATE_MOVIE_SUCCESS',
    payload: movie
});

const createMovieFailure = () => ({
    type: 'CREATE_MOVIE_FAILURE'
});

export {
    getMoviesStart,
    getMoviesSuccess,
    getMoviesFailure,
    deleteMovieStart,
    deleteMovieSuccess,
    deleteMovieFailure,
    createMovieStart,
    createMovieSuccess,
    createMovieFailure,
    updateMovieStart,
    updateMovieSuccess,
    updateMovieFailure
};
