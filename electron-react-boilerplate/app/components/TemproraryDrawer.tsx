import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton, Link, FormControl, Select, InputLabel, MenuItem } from '@material-ui/core';
import routes from '../constants/routes.json';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

const useStyles = makeStyles(theme=>({
  list: {
    width: 250,
    height:'100%',
    backgroundColor:'#242628'
  },
  fullList: {
    width: 'auto',
  },
  logo:{
    marginBottom:'-5px'
  },
  logoSpan:{
    color:'white',
    marginBottom:'50px'
  },
  menulogo:{
    padding:'10px'
  },
  menulogoSpan:{
    color:'white',
  },
  leftMenu:{
    width:'100%'
  },
  listItemText:{
    color:'#86878c'
  },
  divider:
  {
    backgroundColor:'navy'
  },
  workload:
  {
    color:'#86878c',
    padding:'5px'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    color: 'white'
  },
  select:{
    color:'white'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputlabel:{

  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = anchor => (
    <div
      className={classes.list}
      role="presentation"
    >
      <img src="https://logodix.com/logo/1664371.png" width="100px" className={classes.menulogo}  />
      <span className={classes.menulogoSpan}>Desktop Client</span>
      <Divider className={classes.divider} />
       <List>
         <ListItem>
         {/* <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label" className={classes.inputlabel}>Enviroment</InputLabel>
                <Select
                className={classes.select}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled">
                    <MenuItem value={10}>Dev</MenuItem>
                    <MenuItem value={20}>Stage</MenuItem>
                    <MenuItem value={30}>Prod</MenuItem>
                </Select>
            </FormControl> */}
         </ListItem>
         <ListItem>
         {/* <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Refresh</InputLabel>
                <Select
                     className={classes.select}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                >
                    <MenuItem value={10}>5 seconds</MenuItem>
                    <MenuItem value={20}>30 seconds</MenuItem>
                    <MenuItem value={30}>5 minutes</MenuItem>
                    <MenuItem value={30}>none</MenuItem>
                </Select>
            </FormControl> */}
         </ListItem>
         <ListItem>
           <ViewComfyIcon className={classes.workload}/> 
           <ListItemText primary=" Workloads" className={classes.listItemText} />
         </ListItem>
        <ListItem>
          <Link to={routes.Error}><ListItemText primary="ErrorQueues" className={classes.listItemText} /></Link>
        </ListItem>
        <ListItem>
          <Link to={routes.Business}><ListItemText primary="BusinessQueue" className={classes.listItemText} /></Link>
        </ListItem>
      </List>
    
    </div>
  );

  return (
    <div className={classes.leftMenu}>
      {['left'].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
        
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(anchor, true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <img src="https://logodix.com/logo/1664371.png" width="100px" className={classes.logo} />
          <sup className={classes.logoSpan}> Desktop Client</sup>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}