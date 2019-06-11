import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { fetchMenus, successFetchMenus, failureFetchMenus,  newOrder } from './actions';

const initial = {
    menus: [],
    orders: {
        list: [],
    }
}

const menus = createReducer({
    [fetchMenus]: (state, payload) => {
        return [];
    },
    [successFetchMenus]: (state, payload) => {
        return payload.menus;
    },
    [failureFetchMenus]: (state, payload) => {
        return [];
    }
}, initial.menus);

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
    { menus, orders }
)
