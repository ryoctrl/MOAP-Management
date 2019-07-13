import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OrderCard from '../components/OrderCard';

class Orders extends Component {
    render() {
        const { orders, classes } = this.props;
        const ordersList = orders.list;

        if(ordersList.length === 0) {
            return <div>現在注文はありません。</div>
        } 

        return (
            <Grid container spacing={2}>
            {ordersList.map(order => (
                <Grid key={order.id} item xs={6} lg={3} className={classes.card}>
                    <OrderCard key={order.id} order={order}/>
                </Grid>
            ))}
            </Grid>
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

