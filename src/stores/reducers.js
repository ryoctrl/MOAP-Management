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
  changeOrdersPageLayout,
  updateTime,
} from './actions';
import ORDERS_PAGE_LAYOUT from '../constants/OrdersPageLayout';
import DateHelper from '../helpers/DateHelper';

const initial = {
  menus: [],
  orders: {
    list: [],
    isInitialized: false,
    isFetching: false,
    error: null,
  },
  page: {
    now: null,
    nowStr: null,
    name: 'ORDERS',
    ordersPage: {
      layout: ORDERS_PAGE_LAYOUT.TIMETABLE,
    },
  },
};

const menus = createReducer(
  {
    [fetchMenus]: (state, payload) => {
      return [];
    },
    [successFetchMenus]: (state, payload) => {
      return payload.menus;
    },
    [failureFetchMenus]: (state, payload) => {
      return [];
    },
  },
  initial.menus,
);

const orders = createReducer(
  {
    [newOrder]: (state, payload) => {
      return state;
    },
    [orderCompleted]: (state, payload) => {
      const newState = Object.assign({}, state);
      newState.list = newState.list.filter((order) => order.id !== payload.id);
      return newState;
    },
    [orderPaid]: (state, payload) => {
      return {
        ...state,
        list: [...state.list, payload],
      };
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
      console.log('Returned new state!');
      return newState;
    },
    [failureFetchUncompletedOrders]: (state, payload) => {
      const newState = Object.assign({}, state);
      newState.isFetching = false;
      newState.error = payload.error;
      return newState;
    },
  },
  initial.orders,
);

const page = createReducer(
  {
    [updateTime]: (state, payload) => {
      console.log('updating time!');
      console.log(payload);
      console.log(new DateHelper(payload, true).format('HH:mm'));
      return Object.assign({}, state, {
        now: payload,
        nowStr: new DateHelper(payload, true).format('MM月DD日 HH:mm'),
      });
    },
    [changePage]: (state, payload) => {
      return Object.assign({}, state, { name: payload });
    },
    [changeOrdersPageLayout]: (state, payload) => {
      return Object.assign({}, state, { ordersPage: { layout: payload } });
    },
  },
  initial.page,
);

export default combineReducers({ menus, orders, page });
