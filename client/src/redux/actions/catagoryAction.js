import {GET_CATAGORIES, CREATE_CATAGORY, UPDATE_CATAGORY, DELETE_CATAGORY} from '../constants/actionTypes'
import axios from 'axios'
// import {setHeaders} from '../../setHeaders/index'

export const getCatagories = () => async (dispatch) => {
    try {
        const allCatagories = await axios.get('api/categories');

        dispatch({
            type : GET_CATAGORIES,
            payload : allCatagories.data
        })
    } catch (error) {
        console.log(error);
    }
};

export const createCatagory = (catagory) => async (dispatch) => {
    try {
        const catagoryData = await axios.post('api/create_category', catagory);

        dispatch({
            type : CREATE_CATAGORY,
            payload : catagoryData.data
        })
    } catch (error) {
        console.log(error);
    }
};

export const updateCatagory = (id, specificiedCatagory) => async (dispatch) => {
    try {
        const {data} = await axios.put(`api/update_category/${id}`, specificiedCatagory);

        dispatch({
            type : UPDATE_CATAGORY,
            payload : data
        })
    } catch (error) {
        console.log(error);
    }
};

export const deleteCatagory = (id) => async (dispatch) => {
    try {
        await axios.delete(`api/delete_category/${id}`);
        
        dispatch({
            type : DELETE_CATAGORY,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
};

