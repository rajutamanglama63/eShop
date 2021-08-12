import {ALL_USERS, GET_USER, USER_INFO, DELETE_USER} from '../constants/actionTypes'
import axios from 'axios'
import { setHeaders } from '../../setHeaders';

export const allUsers = () => async (dispatch) => {
    try {
        const usersList = await axios.get('/auth/users');
        // console.log(usersList);

        dispatch({
            type : ALL_USERS,
            payload : usersList.data
        })
    } catch (error) {
        console.log(error);
    }
};

export const userInfo = () => async (dispatch) => {
    try {
        const userInformation = await axios.get('/auth/user_info', setHeaders());

        dispatch({
            type : USER_INFO,
            payload : userInformation
        });
    } catch (error) {
        console.log(error);
    }
};

export const getUser = (id) => async (dispatch) => {
    try {
        await axios.get(`/auth/user/${id}`);
        dispatch({
            type : GET_USER,
            payload : id
        });
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = (id) => async (dispatch) => {
    try {
        await axios.delete(`/auth/user/${id}`);
        dispatch({
            type : DELETE_USER,
            payload : id
        });
    } catch (error) {
        console.log(error);
    }
};

