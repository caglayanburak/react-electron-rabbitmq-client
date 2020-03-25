import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './BusinessQueues.css';
import PropTypes from 'prop-types';
import { Container, Grid, Paper, TableContainer, Table, TableHead, makeStyles, TableBody, Typography, Box, AppBar, Tabs, Tab, withStyles, TextField, ListItem, ListItemIcon, ListItemText, List, Divider, Card, CardContent, CardActions, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import TableHeader from './TableHeader';
import TableItem from './TableItem';
import routes from '../constants/routes.json';
import enviroments from '../constants/enviroments.json';
import SimpleModal from './SimpleModal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function BusinessQueues() {
  const useStyles = makeStyles(theme => ({
    container: {
      maxHeight: 540,
      backgroundColor: 'transparent',
      color: 'white'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      color: 'white'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    requeueButton: {
      color: 'yellow',
      border: '1px solid yellow'
    },
    regexSelect: {
      color: 'white'
    },
    regexLabel:{
     color: 'rgba(71, 171, 48, 1)'
    },
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    }
  }));
  const classes = useStyles();
  const [data, setData] = useState({});
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function fetchData() {
    const res = await fetch(enviroments.apiUrl + "rabbitmq/regexQueues/^(xeon.b2b).*(error)$");
    let data = await res.json();
    data.items = data.items.sort((a: { messages: number; }, b: { messages: number; }) => (a.messages > b.messages) ? -1 : 1);
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  function Item(data: any) {
    return (<TableItem queue={data.queue} />);
  }

  const AntTabs = withStyles({
    root: {
      borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: 'white',
    },
  })(Tabs);

  const AntTab = withStyles(theme => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        color: 'white',
        opacity: 1,
      },
      '&$selected': {
        color: 'yellow',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: 'white',
      },
    },
    selected: {},
  }))(props => <Tab disableRipple {...props} />);

  const [regexList, setRegexList] = React.useState([]);

  useEffect(() => {
    fetchRegexlist()
  }, [])

  const fetchRegexlist = () => {
    setRegexList(JSON.parse(window.localStorage.getItem('regexList')));
  }


  return (
    <Container fixed>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={styles.backButton} data-tid="backButton">
              <Link to={routes.Queues}>
                <i className="fa fa-arrow-left fa-3x" />
              </Link>
            </div>
          </Grid>
          <Grid item xs={12}>

          </Grid>
          <Grid item md={12}>

            <AntTabs value={value} onChange={handleChange} aria-label="simple tabs example">
              <AntTab label="Regex Queues" {...a11yProps(0)} />
              <AntTab label="Regex List" {...a11yProps(1)} />
            </AntTabs>
            <TabPanel value={value} index={0}>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label" className={classes.regexLabel}>My Regex</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled" className={classes.regexSelect}>
                  {regexList.map((regex, index) => (
                    <MenuItem value={regex.regex}>{regex.regex}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TableContainer component={Paper} className={classes.container}>
                <Table>
                  <TableHead>
                    <TableHeader response={data.items} />
                  </TableHead>
                  <TableBody>
                    {data.items && data.items.map(queue => (
                      <Item queue={queue} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>

              <Card className={classes.root}>
                <CardContent>
                  <SimpleModal />
                  <Grid item md={12} xs={6} sm={3}>
                    <List component="nav" aria-label="main mailbox folders">
                      {regexList.map((regex, index) => (
                        <ListItem button>
                          > {regex.regex}
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                </CardContent>
              </Card>
            </TabPanel>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}