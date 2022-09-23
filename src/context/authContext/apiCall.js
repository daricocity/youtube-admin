import axios from 'axios';
import config from '../../config';
import { loginStart, loginSuccess, loginFailure, logoutUser } from './AuthActions';

// AUTH
const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${config.proxy}/auth/login`, user);
        res.data.isAdmin && dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure());
    }
};

const logout = async (dispatch) => {
    localStorage.setItem('user', null);
    dispatch(logoutUser());
};

export { login, logout };
