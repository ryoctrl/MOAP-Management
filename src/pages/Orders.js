import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OrderCard from '../components/OrderCard';
import OrdersGridView from '../components/Orders/OrdersGridView';
import OrdersTimeTableView from '../components/Orders/OrdersTimeTableView';
import layouts from '../constants/OrdersPageLayout';

class Orders extends Component {
    render() {
        const { page, orders, classes } = this.props;
        const ordersList = orders.list;

        switch(page.ordersPage.layout) {
            case layouts.TIMETABLE:
                return <OrdersTimeTableView />
            case layouts.LIST:
                return <OrdersGridView />
        }
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

