import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, channel} from 'redux-saga/effects';
import { newOrder } from './actions';

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
    const task = yield fork(handleIO, socket);
}

export default function* rootSaga() {
    yield fork(flow);
}
