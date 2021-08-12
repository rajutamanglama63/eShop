import {REGISTER, REGISTER_FAIL, LOGIN, LOGIN_FAIL, LOGOUT} from '../constants/actionTypes'
import jwtDecode from 'jwt-decode'

const initialState = {
    accessToken : localStorage.getItem("accessToken"),
    name : null,
    email : null,
    role : null,
    _id : null
};

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case REGISTER:
        case LOGIN:
            const user = jwtDecode(action.accessToken);
            return {
                ...initialState,
                accessToken : user.accessToken,
                name : user.name,
                email : user.email,
                role : user.role,
                _id : user._id
            };
        case LOGOUT:
            localStorage.removeItem("accessToken");
            return {
                accessToken : null,
                name : null,
                email : null,
                role : null,
                _id : null
            };
        case REGISTER_FAIL:
            return action.payload
        case LOGIN_FAIL:
            return action.payload
        default:
            return state;
    }
};