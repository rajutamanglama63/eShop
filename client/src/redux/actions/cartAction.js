import {ADD_TO_CART, REMOVE_FROM_CART} from '../constants/actionTypes'
import axios from 'axios'
import { setHeaders } from '../../setHeaders';

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const uid = getState().auth._id;
    try {
        const product = await axios.get(`/api/product/${id}`, setHeaders());

        dispatch({
            type : ADD_TO_CART,
            payload : {...product.data, qty}
        })
    } catch (error) {
        console.log(error);
    }
};

export const removeFromCart = (id) => async (dispatch) => {
    try {
        dispatch({
            type : REMOVE_FROM_CART,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
};