import {ADD_TO_CART, REMOVE_FROM_CART} from '../constants/actionTypes'

export const cartReducers = (cartItems = [], action) => {
    switch(action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const existingItem = cartItems.find((data) => data._id === item._id);
            if(existingItem) {
                return cartItems.map((cartItem) => cartItem._id === existingItem._id ? item : cartItem)
            } else {
                return [...cartItems, item]
            }
        case REMOVE_FROM_CART:
            return cartItems.filter((cartItem) => cartItem._id !== action.payload);
        default:
            return cartItems;
    }
};