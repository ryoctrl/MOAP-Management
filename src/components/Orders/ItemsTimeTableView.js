import React, { Component } from 'react';
import { Grid, Typography} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OrderCard from '../OrderCard';
import DateHelper from '../../helpers/DateHelper';

class ItemsTimeTableView extends Component {
    render() {
        const { page, orders, classes } = this.props;
        const ordersList = orders.list;

        const timetable = {};
        ordersList.forEach(order => {
            if(!order.handed_at) return;
            const now = new DateHelper(page.now, true);
            const date = new DateHelper(order.handed_at, true);

            // NOTE: 受渡時刻を過ぎた注文は非表示
            if(date.date.isBefore(now.date)) return;
            const dateStr = date.format('HH:mm');
            const tt = timetable[dateStr];
            if(!tt) {
                const { OrderItems, createdAt, handed_at, is_completed, is_paid, total_price, updated_at } = order;
                return timetable[dateStr] = {
                    OrderItems: OrderItems.map(item => Object.assign({}, item)),
                    createdAt,
                    handed_at,
                    is_completed,
                    is_paid,
                    total_price,
                    updated_at,
                    id: `${dateStr}_all_items`
                };
            } 

            const currentOrder = timetable[dateStr];
            order.OrderItems.map(item => {
                const itemAry = currentOrder.OrderItems.filter(currentItem => currentItem.id === item.id);
                if ( itemAry.length === 0) {
                    currentOrder.OrderItems.push(Object.assign({}, item));
                } else {
                    itemAry[0].amount += item.amount;
                }
            });
        });

        if(Object.keys(timetable).length === 0) {
            return (
                <Typography align="center" variant="h5" component="h5">
                    現在注文はありません。
                </Typography>
            )
        } 
        
        return (
            <Grid container spacing={2}>
                { Object.keys(timetable).map(time => {
                    const order = timetable[time];
                    return (
                        <Grid key={`timetable-column-${time}`} item xs={6} lg={3} className={classes.card}>
                            <Typography align="center" variant="h5" component="h5">
                                {time} 提供
                            </Typography>
                            <div key={`timetable-column-item-${order.id}`} className={classes.orderCard}> 
                                <OrderCard key={order.id} order={order} />
                            </div>
                        </Grid>
                    )
                })}
            </Grid>
        );
    }
}

const styles = theme => ({
    card: {
        width: '100%'
    },
    orderCard: {
        marginTop: '10px',
    }
});

const select = state => state;

ItemsTimeTableView = withStyles(styles)(ItemsTimeTableView);
export default connect(select)(ItemsTimeTableView);

