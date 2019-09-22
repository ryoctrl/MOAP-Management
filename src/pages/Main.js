import React, { Component } from 'react';
import classNames from 'classnames';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Menu from './Menu';
import Orders from './Orders';
import NavBar from '../components/NavBar';
import { connect } from 'react-redux';
import {
    fetchMenus,
    fetchUncompletedOrders,
} from '../stores/actions';

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    }
});

const drawerWidth = 240;

class Main extends Component {
    constructor() {
        super();
        this.state = {
            drawerOpen: false,
            name: 'Top'
        };
    }

    componentWillMount() {
        const { dispatch } = this.props;
        dispatch(fetchMenus());
        dispatch(fetchUncompletedOrders());
    }

    handleToggle() {
        this.setState({
            drawerOpen: !this.state.drawerOpen
        });
    }

    changePage(name) {
        this.handleToggle();
        this.setState({ 
            page: name
        });
    }

    render() {
        const { classes } = this.props;
        const { drawerOpen, page } = this.state;
        return (
            <MuiThemeProvider theme={theme}>
                <div className={classes.root}>
                    <NavBar 
                        theme={theme} 
                        classes={classes} 
                        onToggle={() => this.handleToggle()} 
                        changePage={name => this.changePage(name)}
                        drawerOpen={drawerOpen}
                        page={page}/>
                    <main className={classNames(classes.content, {[classes.contentShift]: drawerOpen,})}>
                        <div className={classes.drawerHeader}/>
                        {(() => {
                        if(this.state.page === 'Top') return <Menu />
                        else return <Orders />
                        })()}
                    </main>
                </div>
            </MuiThemeProvider>
        )
    }
}

const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end'
    },
    grow: {
        flexGrow: 1
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth
    },
    contentShift: {
        [theme.breakpoints.up('xl')]: {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen
            }),
            marginLeft: 0,
        }
    },
});

function select({menus, orders}) {
    return { menus, orders};
}

Main = withStyles(styles, { withTheme: true })(Main);
export default connect(select)(Main);

