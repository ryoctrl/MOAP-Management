import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

class OrderCard extends Component {
    render() {
        let { order, menus } = this.props;
        order = order.map(menu => {
            const orderMenu = menus.filter(m => m.id === menu.menu_id);
            return Object.assign(menu, orderMenu[0]);
        });

        const cols = [
            {title: 'Name', field: 'name'},
            {title: '数量', field: 'amount'}
        ];

        return (
            <MaterialTable
                title="Orders"
                columns={cols}
                data={order}
                options={{
                    search: false,
                    paging: false,
                    //pageSize: order.length,
                }}
            />
        )
    }
}

const select = state => state;

export default connect(select)(OrderCard);

