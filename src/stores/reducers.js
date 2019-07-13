import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import { 
    fetchMenus, 
    successFetchMenus, 
    failureFetchMenus,  
    fetchUncompletedOrders,
    successFetchUncompletedOrders,
    failureFetchUncompletedOrders,
    newOrder,
    orderCompleted,
} from './actions';

const initial = {
    menus: [],
    orders: {
        list: [],
        isInitialized: false,
        isFetching: false,
        error: null
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
        return {
            ...state,
            list: [ ...state.list, payload]
        };
    },
    [orderCompleted]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.list = newState.list.filter(order => order.id !== payload.id);
        return newState;
    },
    [fetchUncompletedOrders]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.isFetching = true;
        return newState;
    },
    [successFetchUncompletedOrders]: (state, payload) => {
        console.log(payload);
        const newState = Object.assign({}, state);
        newState.isFetching = false;
        newState.list = payload.data;
        return newState;
    },
    [failureFetchUncompletedOrders]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.isFetching = false;
        newState.error = payload.error;
        return newState;
    }
}, initial.orders);

export default combineReducers(
    { menus, orders }
)
