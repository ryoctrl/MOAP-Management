import { createAction } from 'redux-act';

export const FETCH_MENUS = 'FETCH_MENUS';
export const SUCCESS_FETCH_MENUS = 'SUCCESS_FETCH_MENUS';
export const FAILURE_FETCH_MENUS = 'FAILURE_FETCH_MENUS';

export const FETCH_UNCOMPLETED_ORDERS = 'FETCH_UNCOMPLETED_ORDERS';
export const SUCCESS_FETCH_UNCOMPLETED_ORDERS = 'SUCCESS_FETCH_UNCOMPLETED_ORDERS';
export const FAILURE_FETCH_UNCOMPLETED_ORDERS = 'FAILURE_FETCH_UNCOMPLETED_ORDERS';


export const fetchMenus = createAction(FETCH_MENUS);
export const successFetchMenus = createAction(SUCCESS_FETCH_MENUS);
export const failureFetchMenus = createAction(FAILURE_FETCH_MENUS);

export const fetchUncompletedOrders = createAction(FETCH_UNCOMPLETED_ORDERS);
export const successFetchUncompletedOrders = createAction(SUCCESS_FETCH_UNCOMPLETED_ORDERS);
export const failureFetchUncompletedOrders = createAction(FAILURE_FETCH_UNCOMPLETED_ORDERS);

export const newOrder = createAction('new order');

export const orderCompleted = createAction('orderCompleted');

export const orderPaid = createAction('orderPaid');

export const COMPLETE_ORDER = 'COMPLETE_ORDER';
export const completeOrder = createAction(COMPLETE_ORDER);
