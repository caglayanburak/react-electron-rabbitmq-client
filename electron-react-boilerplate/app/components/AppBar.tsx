import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import TemporaryDrawer from './TemproraryDrawer';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiAppBar-root': {
      margin: theme.spacing(1),
      backgroundColor: 'transparent'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <TemporaryDrawer />
         
        </Toolbar>
      </AppBar>
    </div>
  );
}
