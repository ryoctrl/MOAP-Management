import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put } from 'redux-saga/effects';
import { 
    allMenus, 
    uncompletedOrders,
    completeOrderRequest,
} from './api';
import { 
    fetchMenus, 
    successFetchMenus, 
    failureFetchMenus, 
    fetchUncompletedOrders,
    successFetchUncompletedOrders,
    failureFetchUncompletedOrders,
    newOrder,
    completeOrder,
    orderCompleted,
    orderPaid,
} from './actions';

const URL = process.env.REACT_APP_API_HOST;

const connect = () => {
    const socket = io(URL);
    return new Promise(resolve => {
        socket.on('connect', () => {
            resolve(socket);
        });
    });
};

const subscribe = socket => {
    return eventChannel(emit => {
        socket.on('orders.new', message => {
            emit(newOrder(message));
        });

        socket.on('orders.complete', message => {
            emit(orderCompleted(message));
        });
        socket.on('orders.paid', message => {
            emit(orderPaid(message));
        });
        return () => {};
    });
};

function* read(socket) {
    const channel = yield call(subscribe, socket);
    while(true) {
        let action = yield take(channel);
        yield put(action);
    }
}

function* handleIO(socket) {
    yield fork(read, socket);
    //yield fork(write, socket);
}

function* flow() {
    const socket = yield call(connect);
    yield fork(handleIO, socket);
}

function* menuInit() {
    while(true) {
        yield take(fetchMenus);
        const { menus, error } = yield call(allMenus);
        if(menus && !error) {
            yield put(successFetchMenus({ menus }));
        } else {
            yield put(failureFetchMenus({ error }));
        }
    }
}

function* orderInit() {
    while(true) {
        yield take(fetchUncompletedOrders);
        const { data, error } = yield call(uncompletedOrders);
        if(data && !error) {
            yield put(successFetchUncompletedOrders({ data }));
        } else {
            yield put(failureFetchUncompletedOrders({ error }));
        }
    }
}

function* completeOrderFlow() {
    while(true) {
        const action = yield take(completeOrder)
        yield call(completeOrderRequest, action.payload);
    }
}

export default function* rootSaga() {
    yield fork(menuInit);
    yield fork(orderInit);
    yield fork(completeOrderFlow);
    yield fork(flow);
}
