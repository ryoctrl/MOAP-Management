import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormLabel, Button, FormHelperText } from '@material-ui/core';
import CartContext from '../contexts/cart';

const renderFile = withStyles(() => ({
    input: {
        display: 'none',
    },
    button: {
        marginTop: 10,
    }
}))(
    ({
        input: { value, name, onChange},
        label,
        meta: { touched, error},
        classes,
        onFieldChange,
        buttonLabel,
        accept = '*',
        required = false,
        rootClass = '',
    }) => (
        <FormControl classes={{root: rootClass}} required={required} component='fieldset' error={!!(touched && error)}>
            <FormLabel component='legend'>{label}</FormLabel>
            <input
                accept={accept}
                className={classes.input}
                id={name}
                type='file'
                onChange={e => {
                  e.preventDefault()
                  onChange(e.target.files[0])
                  onFieldChange && onFieldChange(e.target.files[0])
                }}
                onBlur={() => {}}
            />
            <label htmlFor={name}>
                <Button classes={{root: classes.button}} variant='outlined' component='span'>
                    {buttonLabel || 'ファイルを選択'}
                </Button>
            </label>
            <label>{value && value.name}</label>
            {touched && error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
);

class AddMenu extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            price: '',
            stocks: '',
            requiredTime: '',
            image: '',
        }
    }
    render() {
        const { classes, menuOpen, onClose } = this.props;
        return (
            <Dialog open={menuOpen} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">メニューを追加</DialogTitle>
                <DialogContent>
                    <DialogContentText>


                    </DialogContentText>
                </DialogContent>
            </Dialog>
        )
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    }
});

export default withStyles(styles)(AddMenu);
