import axios from 'axios';
import config from '../../config';
import {
    getUsersStart,
    getUsersSuccess,
    getUsersFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} from './UserActions';

// UPDATE LIST
const updateUser = async (id, user, dispatch) => {
    dispatch(updateUserStart());
    try {
        const res = await axios.put(`${config.proxy}/users/` + id, user, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(updateUserSuccess(res.data));
    } catch (err) {
        dispatch(updateUserFailure());
    }
};

// DELETE USER
const deleteUser = async (id, dispatch) => {
    dispatch(deleteUserStart());
    try {
        await axios.delete(`${config.proxy}/users/` + id, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(deleteUserSuccess(id));
    } catch (err) {
        dispatch(deleteUserFailure());
    }
};

// GET USERS
const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await axios.get(`${config.proxy}/users`, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

export { getUsers, deleteUser, updateUser };
