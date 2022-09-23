import axios from 'axios';
import config from '../../config';
import {
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
} from './MovieActions';

// UPDATE MOVIE
const updateMovies = async (id, movie, dispatch) => {
    dispatch(updateMovieStart());
    try {
        const res = await axios.put(`${config.proxy}/movies/` + id, movie, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(updateMovieSuccess(res.data));
    } catch (err) {
        dispatch(updateMovieFailure());
    }
};

// DELETE MOVIE
const deleteMovie = async (id, dispatch) => {
    dispatch(deleteMovieStart());
    try {
        await axios.delete(`${config.proxy}/movies/` + id, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(deleteMovieSuccess(id));
    } catch (err) {
        dispatch(deleteMovieFailure());
    }
};

// GET MOVIES
const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try {
        const res = await axios.get(`${config.proxy}/movies`, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(getMoviesSuccess(res.data));
    } catch (err) {
        dispatch(getMoviesFailure());
    }
};

// CREATE MOVIE
const createMovies = async (movie, dispatch) => {
    dispatch(createMovieStart());
    try {
        const res = await axios.post(`${config.proxy}/movies/`, movie, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(createMovieSuccess(res.data));
    } catch (err) {
        dispatch(createMovieFailure());
    }
};

export { getMovies, deleteMovie, createMovies, updateMovies };
