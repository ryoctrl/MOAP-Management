import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { newOrder } from './actions';

const initial = {
    orders: {
        list: [],
    }
}

const orders = createReducer({
    [newOrder]: (state, payload) => {
        console.log(payload);
        return {
            ...state,
            list: [ ...state.list, payload]
        };
    }
}, initial.orders);

export default combineReducers(
    { orders }
)
