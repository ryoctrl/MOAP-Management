import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, /*DialogContentText,*/ DialogTitle, /*FormControl, FormLabel, */Button/*, FormHelperText */} from '@material-ui/core';
import { connect } from 'react-redux';
import {
    changeOrdersPageLayout
} from '../stores/actions';
import layouts from '../constants/OrdersPageLayout';

class LayoutMenu extends Component {
    render() {
        const { classes, page, dispatch, menuOpen, onClose } = this.props;
        return (
            <Dialog open={menuOpen} onClose={onClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">メニューを追加</DialogTitle>
                    <DialogContent>
                        <Button 
                            onClick={() => dispatch(changeOrdersPageLayout(layouts.TIMETABLE))}
                            className={classes.submitButton}>
                            タイムテーブル
                        </Button>

                        <Button 
                            onClick={() => dispatch(changeOrdersPageLayout(layouts.TIMETABLE_GROUPED_BY_MENU))}
                            className={classes.submitButton}>
                            タイムテーブル(商品ごと)
                        </Button>
                            
                        <Button 
                            onClick={() => dispatch(changeOrdersPageLayout(layouts.LIST))}
                            className={classes.submitButton}>
                            注文リスト
                        </Button>
                    </DialogContent>
            </Dialog>
        );
    }
}

const styles = theme => ({
    submitButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        zIndex: 1000
    }
});

LayoutMenu = withStyles(styles)(LayoutMenu);
LayoutMenu = connect(stores => stores)(LayoutMenu);
export default LayoutMenu;
