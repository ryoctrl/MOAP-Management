import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OrderCard from '../components/OrderCard';
import OrdersGridView from '../components/Orders/OrdersGridView';
import OrdersTimeTableView from '../components/Orders/OrdersTimeTableView';

class Orders extends Component {
    render() {
        const { orders, classes } = this.props;
        const ordersList = orders.list;

        return (
            <OrdersTimeTableView />
        )
    }
}

const styles = theme => ({
    card: {
        width: '100%'
    }
});

const select = state => state;

Orders = withStyles(styles)(Orders);
export default connect(select)(Orders);

