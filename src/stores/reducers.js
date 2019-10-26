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
    orderPaid,
    changePage,
    changeOrdersPageLayout
} from './actions';
import ORDERS_PAGE_LAYOUT from '../constants/OrdersPageLayout';

const initial = {
    menus: [],
    orders: {
        list: [],
        isInitialized: false,
        isFetching: false,
        error: null
    },
    page: {
        name: 'ORDERS',
        ordersPage: {
            layout: ORDERS_PAGE_LAYOUT.TIMETABLE,
        }
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
        return state;
    },
    [orderCompleted]: (state, payload) => {
        const newState = Object.assign({}, state);
        newState.list = newState.list.filter(order => order.id !== payload.id);
        return newState;
    },
    [orderPaid]: (state, payload) => {
        return {
            ...state,
            list: [ ...state.list, payload]
        }
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

const page = createReducer({
    [changePage]: (state, payload) => {
        return Object.assign({}, state, { name: payload });
    },
    [changeOrdersPageLayout]: (state, payload) => {
        return Object.assign({}, state, {ordersPage: { layout: payload }});
    }
}, initial.page);

export default combineReducers(
    { menus, orders, page}
)
