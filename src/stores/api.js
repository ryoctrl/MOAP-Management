/* eslint-disable no-unused-expressions */

const API_HOST = process.env.REACT_APP_API_HOST;
const menuEP = API_HOST + 'api/menues';
const uncompletedOrdersEP = API_HOST + 'api/orders?is_completed=false';
const ordersEP = API_HOST + 'api/orders';

export function allMenus() {
    return fetch(menuEP)
        .then(res => res.json())
        .then(menus => ({menus}))
        .catch(error => ({error}));
}

export function uncompletedOrders() {
    return fetch(uncompletedOrdersEP)
        .then(res => res.json())
        .then(data => ({data}))
        .catch(error => ({error}));
}

/* eslint-disable no-unused-expressions */

