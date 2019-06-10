import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuCard from '../components/MenuCard';
import OrderCard from '../components/OrderCard';

const API_HOST = process.env.REACT_APP_API_HOST;
const OrdersEndpoint = API_HOST + 'api/menues';

class Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            menu: []
        }
    }
    componentDidMount() {
        fetch(OrdersEndpoint)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    menu: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            });

    }

    render() {
        const { classes } = this.props;
        const { error, isLoaded, menu } = this.state;
        return (
            <div>Order</div>
        //<OrderCard />
        )
    }
}

const styles = theme => ({
    card: {
        width: '100%',
    }
});

export default withStyles(styles)(Orders);

