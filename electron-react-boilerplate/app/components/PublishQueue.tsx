import React, { useState, useEffect } from 'react';
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
  FormControlLabel,
  Chip,
  Avatar
} from '@material-ui/core';
import { useParams } from 'react-router';

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
  switch: {
    float: 'right',
    '& .MuiSwitch-track': {
      backgroundColor: 'white'
    }
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

  async function fetchData() {
    const res = await fetch(enviroments.apiUrl + 'rabbitmq/queueMessages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ queueName: fromQueueName })
    });
    let data = await res.json();
    setData(data);
  }

  useEffect(() => {
    if (queue) {
      fetchData();
    }
  }, []);

  const handleClick = () => {
    fetchData();
  };

  const test = (event, item) => {
    let id = item.properties.message_id;
    var c = payloads.filter(x => x.properties.message_id == id);
    if (event.target.checked && c[0] == undefined) {
      let s = payloads;
      s.push(item);
      setAllPayloads(s);
    } else {
      var indexOf = payloads.indexOf(item);
      let s = payloads;
      s.splice(indexOf, 1);
      setAllPayloads(s);
    }

    alert(payloads.length);
  };

  async function publish() {
    const res = await fetch(enviroments.apiUrl + 'rabbitmq/publish', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ allPayloads: payloads, queueName: toQueueName })
    });

    let data = await res.json();
  }
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
                  <ListItem key={item} role="listitem" button>
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
        <Paper className={classes.paper}>
          <List dense component="div" role="list">
            {data &&
              data.map(item => {
                return (
                  <ListItem key={item} role="listitem" button>
                    <ListItemIcon>
                      <Checkbox
                        tabIndex={-1}
                        onChange={e => test(e, item)}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${item.properties.headers['MT-Fault-Message']}`}
                    />
                  </ListItem>
                );
              })}
            <ListItem />
          </List>
        </Paper>
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
          <Grid item md={12}>
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
            </h3>

            <DataItem />
          </Grid>
          <Grid item md={12}>
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
            <Button
              variant="outlined"
              className={classes.publishButton}
              onClick={publish}
            >
              Publish
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
