import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { completeOrder } from '../stores/actions';

class OrderCard extends Component {
    onComplete() {
        const { dispatch, order } = this.props;
        dispatch(completeOrder(order));
    }

    render() {
        let { order, menus } = this.props;
        console.log(order);
        const orders = order.OrderItems.map(menu => {
            const orderMenu = menus.filter(m => m.id === menu.menu_id);
            return Object.assign(menu, orderMenu[0]);
        });

        const cols = [
            {title: 'Name', field: 'name'},
            {title: 'Amount', field: 'amount'},
        ];

        if(orders.length === 0) {
            return(<h3>現在のオーダーはありません</h3>)
        } else {
            return (
                <MaterialTable
                    title={String(order.id)}
                    columns={cols}
                    data={orders}
                    options={{
                        search: false,
                        paging: false,
                        //pageSize: order.length,
                    }}
                    actions={[
                        {
                            icon: ThumbUp,
                            tooltip: 'Complete',
                            isFreeAction: true,
                            onClick: this.onComplete.bind(this)
                        }
                    ]}
                />
            )
        }
    }
}

const select = state => state;

export default connect(select)(OrderCard);

