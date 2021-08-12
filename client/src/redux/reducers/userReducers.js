import {ALL_USERS, GET_USER, USER_INFO, DELETE_USER} from '../constants/actionTypes'

export const userReducers = (usersDataList = [], action) => {
    switch(action.type) {
        case ALL_USERS:
            return action.payload;
        case GET_USER:
            return action.payload;
        case USER_INFO:
            return action.payload;
        case DELETE_USER:
            return usersDataList.filter((user) => user._id !== action.payload);
        default:
            return usersDataList;
    }
}