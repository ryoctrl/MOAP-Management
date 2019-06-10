import { createAction } from 'redux-act';

export const FETCH_MENUS = 'FETCH_MENUS';
export const SUCCESS_FETCH_MENUS = 'SUCCESS_FETCH_MENUS';
export const FAILURE_FETCH_MENUS = 'FAILURE_FETCH_MENUS';

export const fetchMenus = createAction(FETCH_MENUS);
export const successFetchMenus = createAction(SUCCESS_FETCH_MENUS);
export const failureFetchMenus = createAction(FAILURE_FETCH_MENUS);

export const newOrder = createAction('new order');

