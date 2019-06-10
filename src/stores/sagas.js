import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put } from 'redux-saga/effects';
import { allMenus } from './api';
import { 
    fetchMenus, 
    successFetchMenus, 
    failureFetchMenus, 
    newOrder 
} from './actions';

const URL = 'https://moap-api.mosin.jp/';

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

export default function* rootSaga() {
    yield fork(menuInit);
    yield fork(flow);
}
