import React, { useState, useEffect, useRef } from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import enviroments from '../constants/enviroments.json';
import MailIcon from '@material-ui/icons/Mail';

import {
  TextField,
  makeStyles,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Button,
  Badge,
  Switch,
  FormControlLabel
} from '@material-ui/core';
import { useParams } from 'react-router';
import CustomSnackbar from './CustomSnackbar';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    color: '#cecece',

    '& .MuiFormLabel-root': {
      color: 'white'
    },
    '& .MuiInputBase-root': {
      color: '#cecece'
    },
    '& .MuiFormHelperText-root': {
      color: '#cecece'
    }
  },
  textField2: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '70%',
    color: '#cecece',

    '& .MuiFormLabel-root': {
      color: 'white'
    },
    '& .MuiInputBase-root': {
      color: '#cecece'
    },
    '& .MuiFormHelperText-root': {
      color: '#cecece'
    }
  },
  textField3: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: '#cecece',

    '& .MuiFormLabel-root': {
      color: 'white'
    },
    '& .MuiInputBase-root': {
      color: '#cecece'
    },
    '& .MuiFormHelperText-root': {
      color: '#cecece'
    }
  },
  button: {
    color: '#72fd6f',
    borderColor: '#72fd6f',
    float: 'right'
  },
  publishButton: {
    color: '#f60',
    borderColor: '#f60',
    float: 'right',
    marginTop: '20px'
  },
  marginLeft: {
    float: 'left'
  },
  switch: {
    float: 'right',
    marginTop: '10px',
    '& .MuiSwitch-track': {
      backgroundColor: 'white'
    }
  },
  selectAll: {
    marginLeft: '20px',
    color: '#1976d2'
  },
  paper: {
    width: '100%',
    height: '50ch',
    overflow: 'auto',
    overflowY: 'auto',
    backgroundColor: 'transparent',
    border: '1px solid #cecece',
    color: 'white',
    '& .MuiCheckbox-root': {
      color: '#f60'
    }
  }
}));

export default function PublishQueue() {
  let { queue } = useParams();
  const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  const [payloads, setAllPayloads] = useState([]);
  const [fromQueueName, setFromQueueName] = useState(queue);
  const [toQueueName, setToQueueName] = useState(queue);
  const [mtredeliverycount, setMtredeliverycount] = useState(0);
  const [allTrue, setAllTrue] = React.useState(false);
  const [mesageBoxState, setMesageBoxState] = React.useState(false);

  const ref = useRef(null);

  async function fetchData() {
    const res = await fetch(enviroments.apiUrl + 'rabbitmq/queueMessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queueName: fromQueueName })
    });
    let data = await res.json();
    var items = new Array<any>();
    data.forEach(element => {
      element.isChecked = false;
      items.push(element);
    });
    setData(items);
  }

  useEffect(() => {
    if (queue) {
      fetchData();
    }
  }, []);

  const handleClick = () => {
    fetchData();
  };

  const selectAll = (event: any) => {
    var checked = event.target.checked;

    setAllTrue(checked);
    if (checked) {
      data.forEach(item => {
        let s = payloads;
        item.isChecked = checked;
        s.push(item.payload);
        setAllPayloads(s);
      });
    } else {
      data.forEach(item => {
        let s = payloads;
        item.isChecked = checked;
        setAllPayloads(s);
      });
      setAllPayloads([]);
    }
  };

  const selectGridItem = (event: any, item: any) => {
    let id = item.properties.message_id;
    var c = payloads.filter(x => x.message_id == id);
    if (event.target.checked && c[0] == undefined) {
      item.isChecked = true;
      setData(r => [...data]);
      setAllPayloads([...payloads, JSON.parse(item.payload)]);
      // s.push(item.payload);
      // setAllPayloads(s);
    } else {
      var indexOf = payloads.indexOf(item.payload);
      let s = payloads;
      s.splice(indexOf, 1);
      item.isChecked = false;
      setData(r => [...data]);
      setAllPayloads(s);
    }
  };

  async function publish() {
    let index = 0;
    let newArr = [...payloads];

    newArr.forEach(payload => {
      if (payload.headers['MT-Redelivery-Count']) {
        let itemPayload = payload;

        itemPayload.headers['MT-Redelivery-Count'] = mtredeliverycount;
        payload = itemPayload;
        payloads[index] = payload;
        setAllPayloads([...payloads]);
      }
      index++;
    });
    
    const res = await fetch(enviroments.apiUrl + 'rabbitmq/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ allPayloads: payloads, toQueueName: toQueueName })
    });

    let data = await res.json();

    ref.current.handleClick("Publish successful");
  };
  const groupMessages = event => {
    if (!event.target.checked) {
      setGroupedData([]);
      return;
    }

    let t = data
      .map(({ properties }) => properties)
      .map(({ headers }) => headers);

    let messages = new Array<any>();
    t.forEach(item => {
      messages.push(item['MT-Fault-Message']);
    });
    var counts = messages.reduce((p, c) => {
      var name = c;
      if (!p.hasOwnProperty(name)) {
        p[name] = 0;
      }
      p[name]++;
      return p;
    }, {});

    let a = Object.keys(counts).map(k => {
      return { name: k, count: counts[k] };
    });

    setGroupedData(a);
  };

  const classes = useStyles();

  const DataItem = () => {
    if (groupedData.length > 0) {
      return (
        <Paper className={classes.paper}>
          <List dense component="div" role="list">
            {groupedData &&
              groupedData.map(item => {
                return (
                  <ListItem key={item.name} role="listitem" button>
                    <ListItemIcon>
                      <Checkbox tabIndex={-1} disableRipple />
                    </ListItemIcon>
                    <ListItemText>{item.name}</ListItemText>
                    <Button variant="outlined" color="secondary">
                      {item.count}
                    </Button>
                  </ListItem>
                );
              })}
            <ListItem />
          </List>
        </Paper>
      );
    } else {
      return (
        <Grid container>
          <Paper className={classes.paper}>
            <Grid item md={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    className={classes.selectAll}
                    checked={allTrue}
                    onChange={event => selectAll(event)}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                label="Select All"
              />
            </Grid>
            <Grid item md={12}>
              <List dense component="div" role="list">
                {data &&
                  data.map(item => {
                    if (item.properties.headers['MT-Fault-Message'])
                      return (
                        <ListItem key={item.properties.message_id} role="listitem" button>
                          <ListItemIcon>
                            <Checkbox
                              tabIndex={-1}
                              checked={item.isChecked}
                              onChange={e => selectGridItem(e, item)}
                              disableRipple
                            />
                          </ListItemIcon>
                          <ListItemText
                            primary={`${item.properties.headers['MT-Fault-Message']} - ${item.properties.message_id}`}
                          />
                        </ListItem>
                      );
                  })}
                <ListItem />
              </List>
            </Grid>
          </Paper>
        </Grid>
      );
    }
  };

  return (
    <Container fixed>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <TextField
              id="standard-full-width"
              label="From Queue Name:"
              value={fromQueueName}
              className={classes.textField}
              style={{ margin: 8 }}
              placeholder="From Queue Name"
              fullWidth
              margin="normal"
              onChange={e => setFromQueueName(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
            <Grid item md={12}>
              <Button
                variant="outlined"
                className={classes.button}
                color="secondary"
                onClick={handleClick}
              >
                Get Messages
              </Button>
            </Grid>
          </Grid>
          <Grid container md={12} spacing={3}>
            <Grid item md={8}>
              <h3>
                Messages{' '}
                <Badge
                  color="secondary"
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  badgeContent={data.length}
                  max={99999}
                  showZero
                >
                  <MailIcon />
                </Badge>
              </h3>
            </Grid>

            <Grid item md={4}>
              <FormControlLabel
                className={classes.switch}
                onChange={groupMessages}
                control={
                  <Switch
                    className={classes.switch}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                  />
                }
                label="Group all messages"
              />
            </Grid>
          </Grid>
          <Grid item md={12}>
            <DataItem />
          </Grid>

          <Grid container md={12}>
            <Grid item md={8}>
              <TextField
                id="standard-full-width"
                label="To Queue Name:"
                value={toQueueName}
                className={classes.textField2}
                style={{ margin: 8 }}
                placeholder="To Queue Name"
                fullWidth
                margin="normal"
                onChange={e => setToQueueName(e.target.value)}
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>

            <Grid item md={3}>
              <TextField
                id="standard-basic"
                style={{ margin: 8 }}
                placeholder="MT-Redelivery-Count"
                label="MT-Redelivery-Count"
                onChange={e => setMtredeliverycount(e.target.value)}
                className={classes.textField3}
              />
            </Grid>

            <Grid item md={1}>
              <Button
                variant="outlined"
                className={classes.publishButton}
                onClick={publish}
              >
                Publish
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <CustomSnackbar ref={ref} />
    </Container>
  );
}

