import {GET_PRODUCTS, GET_PRODUCT, GET_PRODUCTS_FAIL, UPLOAD_PIC, CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT} from '../constants/actionTypes'
import axios from 'axios'

export const getProducts = () => async (dispatch) => {
    try {
        const allProducts = await axios.get('/api/products');

        dispatch({
            type : GET_PRODUCTS,
            payload : allProducts.data
        })
    } catch (error) {
        dispatch({
            type : GET_PRODUCTS_FAIL,
            payload : error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
};

// create product
export const createProduct = (data) => async (dispatch, getState) => {
    try {
        const productData = await axios.post('/api/product/create', data);

        dispatch({
            type : CREATE_PRODUCT,
            payload : productData
        })
    } catch (error) {
        console.log(error);
    }
};

export const uploadPic = (picture) => async (dispatch) => {
    try {
        const uploadPicture = await axios.post('/api/upload', picture, {
            headers : {'content-type': 'multipart/form-data'}
        });

        dispatch({
            type : UPLOAD_PIC,
            payload : uploadPicture
        })
    } catch (error) {
        console.log(error);
    }
};

export const getProduct = (id) => async (dispatch) => {
    try {
        await axios.get(`/api/product/${id}`);

        dispatch({
            type : GET_PRODUCT,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await axios.delete(`api/product/delete/${id}`);
        dispatch({
            type : DELETE_PRODUCT,
            payload : id
        })
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = (id, dataProduct) => async (dispatch) => {
    try {
        const {data} = await axios.patch(`api/product/update/${id}`, dataProduct);
        dispatch({
            type : UPDATE_PRODUCT,
            payload : data
        });
    } catch (error) {
        console.log(error);
    }
}



// export const getProductDetail = (id) => async (dispatch) => {
//     try {
//         const productDetail = await axios.get(`/api/product/${id}`);

//         dispatch({
//             type : GET_PRODUCTS_DETAIL,
//             payload : productDetail.data
//         })
//     } catch (error) {
//         dispatch({
//             type : GET_PRODUCTS_FAIL,
//             payload : error.response && error.response.data.message ? error.response.data.message : error.message
//         })
//     }
// };