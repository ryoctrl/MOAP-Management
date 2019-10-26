import React, { Component } from 'react';
import  { Paper, Popper, ClickAwayListener, Grow, MenuItem, MenuList } from '@material-ui/core';
import AddMenu from './AddMenu';

class TopMenu extends Component {
    constructor(props) {
        super();
        this.state = {
            menuOpen: false,
        };
        this.clickMenu = this.clickMenu.bind(this);
        this.onClose = this.onClose.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    clickMenu(e) {
        this.setState({
            menuOpen: true
        });
    }

    onClose(e) {
        this.props.handleClose(e);
        this.setState({
            menuOpen: false
        });
    }

    handleClose(e) {
        if(this.state.menuOpen) return;
        this.props.handleClose(e);
    }

    render() {
        const { open, anchorEl } = this.props;
        return (
            <Popper open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
            <div>
            <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
                <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                        <MenuList>
                            <MenuItem onClick={this.clickMenu}>Add Menu</MenuItem>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
            <AddMenu menuOpen={this.state.menuOpen} onClose={this.onClose} />
        </div>
        )}
            </Popper>
        )
    }
}

export default TopMenu;
