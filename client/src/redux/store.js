import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import {  uploadReducers} from '../redux/reducers/productsReducers'
import {productsReducers, uploadReducers} from './reducers/productsReducers'
import { cartReducers } from './reducers/cartReducers';
import { authReducer } from './reducers/authReducers';
import { userReducers } from './reducers/userReducers';
import { catagoryReducers } from './reducers/catagoryReducers';

const middleware = [thunk];

const reducers = combineReducers({
    products : productsReducers,
    cart : cartReducers,
    auth : authReducer,
    upload : uploadReducers,
    users : userReducers,
    catagories : catagoryReducers
});

const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));

export default store;