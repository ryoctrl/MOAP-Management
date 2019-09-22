import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogContent, /*DialogContentText,*/ DialogTitle, /*FormControl, FormLabel, */Button/*, FormHelperText */} from '@material-ui/core';
import axios from 'axios';
//import CartContext from '../contexts/cart';

const API_HOST = process.env.REACT_APP_API_HOST;
//const MenuEndpoint = API_HOST + 'api/menues';
const CreateEndpoint = API_HOST + 'api/menues/create';

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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFile = this.handleFile.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const obj = Object.assign({}, this.state);
        const form = new FormData();
        form.append('name', obj.name);
        form.append('price', obj.price);
        form.append('stocks', obj.stocks);
        form.append('requiredTime', obj.requiredTime);
        form.append('image', obj.image);

        axios.post(CreateEndpoint, form)
            .then(res => res.data)
            .then(data => {
                console.log('POST SUCCESS');
                console.log(data);
            })
            .catch(error => {
                console.log('POST ERROR!');
                console.log(error);
            });
    }

    handleFile(e) {
        const target = e.target;
        const file = target.files[0];
        console.log(file);
        this.setState({
            image: file
        });
    }

    render() {
        const { classes, menuOpen, onClose } = this.props;
        return (
            <Dialog open={menuOpen} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">メニューを追加</DialogTitle>
                <DialogContent>
                    <TextField
                        id="menu-name"
                        label="商品名"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="menu-price"
                        label="価格"
                        className={classes.textField}
                        value={this.state.price}
                        onChange={this.handleChange('price')}
                        margin="normal"
                    />
                    <TextField
                        id="menu-stocks"
                        label="在庫数"
                        className={classes.textField}
                        value={this.state.stocks}
                        onChange={this.handleChange('stocks')}
                        margin="normal"
                    />
                    <TextField
                        id="menu-name"
                        label="所要時間"
                        className={classes.textField}
                        value={this.state.requiredTime}
                        onChange={this.handleChange('requiredTime')}
                        margin="normal"
                    />
                    <input type="file" onChange={this.handleFile} />
                    <Button 
                        onClick={this.handleSubmit}
                        className={classes.submitButton}>
                        Submit
                    </Button>
                </DialogContent>
            </Dialog>
        )
    }
}

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '95%',
    },
    submitButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '95%',
        zIndex: 1000
    }
});

export default withStyles(styles)(AddMenu);
