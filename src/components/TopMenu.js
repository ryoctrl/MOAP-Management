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
    }

    clickMenu(e) {
        this.setState({
            menuOpen: true
        });
        //this.props.handleClose(e);
    }

    onClose(e) {
        this.setState({
            menuOpen: false
        });
        this.props.handleClose(e);
    }

    render() {
        const { open, anchorEl, handleClose } = this.props;
        return (
            <Popper open={open} anchorEl={anchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
            >
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList>
                            <MenuItem onClick={this.clickMenu}>Add Menu</MenuItem>
                            <AddMenu menuOpen={this.state.menuOpen} onClose={this.onClose} />
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Grow>
        )}
            </Popper>
        )

    }

}

export default TopMenu;
