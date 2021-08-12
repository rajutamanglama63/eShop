import {GET_CATAGORIES, CREATE_CATAGORY, UPDATE_CATAGORY, DELETE_CATAGORY} from '../constants/actionTypes'


export const catagoryReducers = (catagories = [], action) => {
    switch(action.type){
        case GET_CATAGORIES:
            return action.payload;
        case CREATE_CATAGORY:
            return [...catagories, action.payload];
        case UPDATE_CATAGORY:
            return catagories.map((catagory) => catagory._id === action.payload._id ? action.payload : catagory);
        case DELETE_CATAGORY:
            return catagories.filter((catagory) => catagory._id !== action.payload); 
        default:
            return catagories;
    }
}