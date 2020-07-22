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

export const CHANGE_PAGE = 'CHANGE_PAGE';
export const changePage = createAction(CHANGE_PAGE);

export const CHANGE_ORDERS_PAGE_LAYOUT = 'CHANGE_ORDERS_PAGE_LAYOUT';
export const changeOrdersPageLayout = createAction(CHANGE_ORDERS_PAGE_LAYOUT);

export const UPDATE_TIME = 'UPDATE_TIME';
export const updateTime = createAction(UPDATE_TIME);

export const UPDATE_HANDED_QUEUE = 'UPDATE_SERVICE_QUEUE';
export const updateQueueHanded = createAction(UPDATE_HANDED_QUEUE);


