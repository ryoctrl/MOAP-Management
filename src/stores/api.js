/* eslint-disable no-unused-expressions */
import axios from 'axios';
const API_HOST = process.env.REACT_APP_API_HOST;
const menuEP = API_HOST + 'api/menues';
const uncompletedOrdersEP = API_HOST + 'api/orders?is_completed=false&is_paid=true';

const completeOrderEP = API_HOST + 'api/orders/complete';

const QUEUE_HOST = 'https://moap-queue.mosin.jp/';
const UPDATE_HANDED_EP = QUEUE_HOST + 'queue/hand';


export function allMenus() {
    return axios.get(menuEP)
        .then(res => res.data)
        .then(menus => ({menus}))
        .catch(error => ({error}));
}

export function uncompletedOrders() {
    return axios.get(uncompletedOrdersEP)
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function completeOrderRequest(order) {
    return axios.post(completeOrderEP, {order})
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}

export function updateHand(orderId) {
    return axios.post(UPDATE_HANDED_EP, { orderId } )
        .then(res => res.data)
        .then(data => ({data}))
        .catch(error => ({error}));
}



/* eslint-disable no-unused-expressions */

