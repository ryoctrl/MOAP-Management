import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import MenuCard from '../components/MenuCard';

class Menu extends Component {
    render() {
        const { menus, classes } = this.props;
        return (
            <Grid container spacing={2}>
            {menus.map(item => (
                <Grid key={item.id} item xs={6} lg={3} className={classes.card}>
                    <MenuCard key={item.id} menu={item}/>
                </Grid>
            ))}
            </Grid>
        )
    }
}

const styles = theme => ({
    card: {
        width: '100%',

    }
});

const select = ({ menus }) => ({ menus });

Menu = withStyles(styles)(Menu);
Menu = connect(select)(Menu)
export default Menu;

