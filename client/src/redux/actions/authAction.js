import {REGISTER, REGISTER_FAIL, LOGIN, LOGIN_FAIL, LOGOUT} from '../constants/actionTypes'
import axios from 'axios'

export const register = (user) => async (dispatch) => {
    try {
        const accessToken = await axios.post('/auth/register', user);
        if(accessToken) {
            localStorage.setItem("accessToken", accessToken.data);
        }

        dispatch({
            type : REGISTER,
            accessToken : accessToken.data
        });
    } catch (error) {
        console.error(error);
        dispatch({
            type : REGISTER_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const accessToken = await axios.post('/auth/login', {email, password});
        if(accessToken) {
            localStorage.setItem("accessToken", accessToken.data);
        }

        dispatch({
            type : LOGIN,
            accessToken : accessToken.data
        });
    } catch (error) {
        console.error(error.message);
        dispatch({
            type : LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        });
    }
};


export const logout = () => async (dispatch) => {
    dispatch({
        type : LOGOUT
    });
};


