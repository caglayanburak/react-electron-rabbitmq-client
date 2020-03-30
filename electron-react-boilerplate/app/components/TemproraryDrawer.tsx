import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import enviroments from '../constants/enviroments.json';
import {
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@material-ui/core';
import routes from '../constants/routes.json';
import { Link } from 'react-router-dom';
import ViewComfyIcon from '@material-ui/icons/ViewComfy';

const useStyles = makeStyles(theme => ({
  underline: {
    '&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before': {
      // hover
      borderBottom: `2px solid yellow`
    }
  },
  list: {
    width: 250,
    height: '100%',
    backgroundColor: '#242628'
  },
  fullList: {
    width: 'auto'
  },
  logo: {
    marginBottom: '-5px'
  },
  logoSpan: {
    color: 'white',
    marginBottom: '50px'
  },
  menulogo: {
    padding: '10px'
  },
  menulogoSpan: {
    color: 'white',
    marginBottom: 10
  },
  leftMenu: {
    width: '100%'
  },
  listItemText: {
    color: '#86878c'
  },
  divider: {
    backgroundColor: '#3288f7'
  },
  workload: {
    color: '#86878c',
    padding: '5px'
  },
  formControl: {
    margin: theme.spacing(-1),
    minWidth: 80,
    color: 'white'
  },
  select: {
    color: 'white',
    fontSize: 10,
    border: '1px solid #cecece',
    width: 235,
    height: 50,
    '& .MuiSelect-icon': {
      color: 'yellow',
      height: 20
    },
    '&::after': {
      border: '1px solid yellow',
      color: 'yellow'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  inputlabel: {
    color: '#3288f7',
    fontSize: 10
  }
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false
  });

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const [enviroment, setEnv] = useState();
  const setEnviroment = (event: { target: { value: string } }) => {
    window.localStorage.setItem('enviroment', event.target.value);
    window.location.reload();
  };

  const [refreshInterval, setRefresh] = useState();
  const setRefreshInterval = (event: { target: { value: string } }) => {
    window.localStorage.setItem('refreshInterval', event.target.value);
    window.location.reload();
  };

  const setHostData = (event: { target: { value: string } }) => {
    window.localStorage.setItem('host', event.target.value);
    window.location.reload();
  };

  const [host, setHost] = useState();
  const [vhosts, setVhosts] = useState([]);
  async function fetchVhostsData() {
    const res = await fetch(enviroments.apiUrl + 'rabbitmq/vhosts');
    let data = await res.json();

    setVhosts(data);
  }

  const closeMenu = () => {
    setState('left', false);
  };

  useEffect(() => {
    fetchVhostsData();
    setEnv(window.localStorage.getItem('enviroment'));
    setRefresh(window.localStorage.getItem('refreshInterval'));
    setHost(window.localStorage.getItem('host'));
  }, []);

  const list = anchor => (
    <div className={classes.list} role="presentation">
      <img
        src="https://logodix.com/logo/1664371.png"
        width="100px"
        className={classes.menulogo}
      />
      <span className={classes.menulogoSpan}>Desktop Client</span>
      <Divider className={classes.divider} />
      <List>
        <ListItem>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-filled-label"
              className={classes.inputlabel}
            >
              Enviroment
            </InputLabel>
            <Select
              className={classes.select}
              value={enviroment}
              onChange={setEnviroment}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
            >
              <MenuItem value="htpp://localhost:3000/">Dev</MenuItem>
              <MenuItem value="Stage">Stage</MenuItem>
              <MenuItem value="Prod">Prod</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-filled-label"
              className={classes.inputlabel}
            >
              Refresh
            </InputLabel>
            <Select
              className={classes.select}
              value={refreshInterval}
              onChange={setRefreshInterval}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
            >
              <MenuItem value={5000}>5 seconds</MenuItem>
              <MenuItem value={30000}>30 seconds</MenuItem>
              <MenuItem value={300000}>5 minutes</MenuItem>
              <MenuItem value={0}>none</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel
              id="demo-simple-select-filled-label"
              className={classes.inputlabel}
            >
              Host
            </InputLabel>
            <Select
              className={classes.select}
              onChange={setHostData}
              value={host}
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
            >
              {vhosts &&
                vhosts.map(item => (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                ))}

              <MenuItem value="All">All</MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <ViewComfyIcon className={classes.workload} />
          <ListItemText primary=" Workloads" className={classes.listItemText} />
        </ListItem>
        <ListItem>
          <Link to={routes.Error}  onClick={closeMenu} className={classes.listItemText}>
            Error Queues
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to={routes.Business}
            onClick={closeMenu}
            className={classes.listItemText}
          >
            Business Queues
          </Link>
        </ListItem>
        <ListItem>
          <Link
            to="/publish"
            onClick={closeMenu}
            className={classes.listItemText}
          >
            Publish Messages
          </Link>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.leftMenu}>
      {['left'].map(anchor => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}></Button>

          <IconButton
            edge="start"
            className={classes.menuButton}
            onClick={toggleDrawer(anchor, true)}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <img
            src="https://logodix.com/logo/1664371.png"
            width="100px"
            className={classes.logo}
          />
          <sup className={classes.logoSpan}> Desktop Client</sup>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
