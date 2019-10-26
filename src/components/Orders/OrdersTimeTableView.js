import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OrderCard from '../OrderCard';

class OrdersTimeTableView extends Component {
    render() {
        const { orders, classes } = this.props;
        const ordersList = orders.list;

        const timetable = {};
        ordersList.forEach(order => {
            const tt = timetable[order.handed_at];
            if(!tt) {
                return timetable[order.handed_at] = [ order ];
            } 

            tt.push(order);
        });

        console.log(timetable);

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

OrdersTimeTableView = withStyles(styles)(OrdersTimeTableView);
export default connect(select)(OrdersTimeTableView);

