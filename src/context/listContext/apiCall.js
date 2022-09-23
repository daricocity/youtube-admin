import axios from 'axios';
import config from '../../config';
import {
    getListsStart,
    getListsSuccess,
    getListsFailure,
    deleteListStart,
    deleteListSuccess,
    deleteListFailure,
    createListStart,
    createListSuccess,
    createListFailure,
    updateListStart,
    updateListSuccess,
    updateListFailure
} from './ListActions';

// UPDATE LIST
const updateLists = async (id, list, dispatch) => {
    dispatch(updateListStart());
    try {
        const res = await axios.put(`${config.proxy}/lists/` + id, list, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(updateListSuccess(res.data));
    } catch (err) {
        dispatch(updateListFailure());
    }
};

// DELETE LIST
const deleteList = async (id, dispatch) => {
    dispatch(deleteListStart());
    try {
        await axios.delete(`${config.proxy}/lists/` + id, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(deleteListSuccess(id));
    } catch (err) {
        dispatch(deleteListFailure());
    }
};

// GET LISTS
const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try {
        const res = await axios.get(`${config.proxy}/lists`, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(getListsSuccess(res.data));
    } catch (err) {
        dispatch(getListsFailure());
    }
};

// CREATE LIST
const createList = async (list, dispatch) => {
    dispatch(createListStart());
    try {
        const res = await axios.post(`${config.proxy}/lists/`, list, {
            headers: {
                token: 'Bearer ' + JSON.parse(localStorage.getItem('user')).accessToken
            }
        });
        dispatch(createListSuccess(res.data));
    } catch (err) {
        dispatch(createListFailure());
    }
};

export { getLists, deleteList, createList, updateLists };
