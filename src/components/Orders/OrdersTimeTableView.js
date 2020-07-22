import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import OrderCard from '../OrderCard';
import DateHelper from '../../helpers/DateHelper';

class OrdersTimeTableView extends Component {
  render() {
    console.log('Rendering timetable veiw!');
    const { page, orders, classes } = this.props;
    const ordersList = orders.list;

    const timetable = {};
    console.log('genrate time table!');
    ordersList.forEach((order) => {
      if (!order.handed_at) return;
      const now = new DateHelper(page.now, true);
      const date = new DateHelper(order.handed_at, true);

      // NOTE: 受渡時刻を過ぎた注文は非表示
      if (date.date.isBefore(now.date)) return;
      const dateStr = date.format('HH:mm');
      const tt = timetable[dateStr];
      if (!tt) {
        return (timetable[dateStr] = [order]);
      }

      tt.push(order);
    });

    if (Object.keys(timetable).length === 0) {
      return (
        <Typography align="center" variant="h5" component="h5">
          現在注文はありません。
        </Typography>
      );
    }

    console.log('Rendering timetable!');
    return (
      <Grid container spacing={2}>
        {Object.keys(timetable).map((time) => {
          const orders = timetable[time];
          console.log(time, orders.length);
          return (
            <Grid
              key={`timetable-column-${time}`}
              item
              xs={6}
              lg={3}
              className={classes.card}
            >
              <Typography align="center" variant="h5" component="h5">
                {time} 提供
              </Typography>
              {orders.map((order) => (
                <div
                  key={`timetable-column-item-${order.id}`}
                  className={classes.orderCard}
                >
                  <OrderCard key={order.id} order={order} />
                </div>
              ))}
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

const styles = (theme) => ({
  card: {
    width: '100%',
  },
  orderCard: {
    marginTop: '10px',
  },
});

const select = (state) => state;

OrdersTimeTableView = withStyles(styles)(OrdersTimeTableView);
export default connect(select)(OrdersTimeTableView);
