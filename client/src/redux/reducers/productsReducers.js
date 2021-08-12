import {GET_PRODUCTS, GET_PRODUCT, GET_PRODUCTS_FAIL, UPLOAD_PIC, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from '../constants/actionTypes'

export const productsReducers = (products = [], action) => {
    switch(action.type) {
        case GET_PRODUCTS:
            return action.payload;
        case GET_PRODUCT:
            return action.payload;
        case GET_PRODUCTS_FAIL:
            return [...products, {error : action.payload}];
        case DELETE_PRODUCT:
            return products.filter((product) => product._id !== action.payload);
        case UPDATE_PRODUCT:
            return products.map((product) => product._id === action.payload._id ? action.payload : product);
        default:
            return products;
    }
};

export const uploadReducers = (picture = {}, action) => {
    switch(action.type) {
        case UPLOAD_PIC:
            return action.payload;
        default:
            return picture;
    }
}

export const createProductReducers = (products = [], action) => {
    switch(action.type) {
        case CREATE_PRODUCT:
            return [...products, action.payload];
        default:
            return products;
    }
}

// export const productDetailReducers = (state = { product: {} }, action) => {
//     switch (action.type) {
//         case GET_PRODUCTS_DETAIL:
//             return {
//                 product: action.payload
//             };
//         case GET_PRODUCTS_FAIL:
//             return {
//                 error : action.payload
//             };
//         default:
//             return state;
//     }
// }