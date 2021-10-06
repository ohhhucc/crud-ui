import {combineReducers, createStore} from 'redux';
import storeReducer from './storeReducer';

let reducers = combineReducers({
    tablePage: storeReducer
})

let store = createStore(reducers);

export default store;