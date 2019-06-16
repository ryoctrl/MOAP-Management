import React, { Component } from 'react';
import { connect } from 'react-redux';
import OrderCard from '../components/OrderCard';

class Orders extends Component {
    render() {
        const { menus, orders } = this.props;
        if(orders.list.length === 0) {
            return (<h3>現在オーダーはありません</h3>);
        }
        const orderCards = orders.list.map(order => <OrderCard key={order.id} order={order}/>);
        return orderCards;
    }
}

const select = state => state;

export default connect(select)(Orders);

