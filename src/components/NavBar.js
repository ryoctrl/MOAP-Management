import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { AppBar, MenuItem, Drawer, Toolbar, Typography, IconButton, Divider } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import TopMenu from './TopMenu';

class NavBar extends Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleToggle() {
        console.log('handleToggle!!');
        this.setState({
            open: !this.state.open
        });
    }

    handleClose(event) {
        if(this.anchorEl.contains(event.target)) return;
        this.setState({ open: false});
    };

    render() {
        const { onToggle, changePage, classes, theme, drawerOpen, page } = this.props;
        const { open } = this.state;

        return (
            <div>
                <AppBar position="fixed" className={classNames(classes.appBar, {[classes.appBarShift]: drawerOpen,})}>
                    <Toolbar disableGutters={!drawerOpen}>
                        <IconButton color="inherit" aria-label="Open drawer" onClick={() => onToggle()} className={classNames(classes.menuButton, drawerOpen && classes.hide)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            MOAP - Management
                        </Typography>
                        <IconButton buttonRef={node => {
                                this.anchorEl = node;
                        }}
                        onClick={this.handleToggle}
                        color="inherit">
                            <MoreIcon/>
                        </IconButton>
                        <TopMenu open={this.state.open} anchorEl={this.anchorEl} handleClose={this.handleClose}/>
                    </Toolbar>
                </AppBar>
                <Drawer className={classes.drawer}  variant="persistent" onClick={() => onToggle()}anchor="left" open={drawerOpen} classes={{paper: classes.drawerPaper,}}>
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={() => onToggle()}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    <MenuItem onClick={() => changePage('Top')}>Top</MenuItem>
                    <MenuItem onClick={() => changePage('Orders')}>Orders</MenuItem>
                </Drawer>
            </div>
        );
    }
}

NavBar.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default NavBar;

