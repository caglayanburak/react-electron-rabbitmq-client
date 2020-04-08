import React, { useState, useEffect } from 'react';
import styles from './Home.css';
import enviroments from '../constants/enviroments.json';
import {
  Grid,
  Paper,
  makeStyles,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  withStyles,
  Slider,
  Chip,
  Badge
} from '@material-ui/core';

export default function Home() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      backgroundColor: 'transparent',
      border: '1px solid #3288f7',
      color: '#cecece',
      boxShadow: '1px 2px #3288f7',
      fontWeight: 'bold'
    },
    chiproot: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5)
      }
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      backgroundColor: 'transparent'
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 15,
      color: '#cecece',
      fontWeight: 'bold'
    },
    pos: {
      marginBottom: 12
    },
    chip: {
      color: '#5eba7d',
      borderColor: '#cecece'
    }
  }));

  const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8
    },

    thumb: {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      marginTop: -8,
      marginLeft: -12,
      '&:focus, &:hover, &$active': {
        boxShadow: 'inherit'
      }
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)'
    },
    track: {
      height: 8,
      borderRadius: 4
    },
    rail: {
      height: 8,
      borderRadius: 4
    }
  })(Slider);
  const classes = useStyles();

  const [overview, setOverview] = useState([]);
  const [nodes, setNodes] = useState([]);

  async function fetchData() {
    const res = await fetch(enviroments.apiUrl + 'rabbitmq/overview', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    setOverview(data.object_totals);
  }

  async function fetchData2() {
    const res = await fetch(enviroments.apiUrl + 'rabbitmq/nodes', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    let data = await res.json();
    setNodes(data[0]);
  }

  useEffect(() => {
    fetchData();
    fetchData2();

  }, []);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}> </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            {' '}
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Error Queues
                </Typography>

                <Typography variant="body2" component="p">
                  198
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go Error Queues >></Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Total Queues
                </Typography>

                <Typography variant="body2" component="p">
                  256
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Go Error Queues >></Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper className={classes.paper}> </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper className={classes.paper}>
            {' '}
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  File Descriptor
                </Typography>

                <Typography variant="body2" component="p">
                  <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={20}
                  />
                  <br />
                  572 / 1024
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper className={classes.paper}>
            {' '}
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Socket Descriptor
                </Typography>

                <Typography variant="body2" component="p">
                  <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    max={nodes.sockets_total}
                    defaultValue={nodes.sockets_used}
                  />
                  <br />
                  {nodes.sockets_used + '/' + nodes.sockets_total}
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper className={classes.paper}>
            {' '}
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Memory
                </Typography>

                <Typography variant="body2" component="p">
                  <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={20}
                  />
                  <br />
                  572 / 1024
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper className={classes.paper}>
            {' '}
            <Card className={classes.root}>
              <CardContent>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  Disk Space
                </Typography>

                <Typography variant="body2" component="p">
                  <PrettoSlider
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                    defaultValue={20}
                  />
                  <br />
                  572 / 1024
                </Typography>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={2}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}></Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}>
            <Card className={classes.root}>
              <CardContent>
                <div className={classes.chiproot}>
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={'Connections:' + overview.connections}
                    color="secondary"
                  />
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={'Channels:' + overview.channels}
                    color="secondary"
                  />
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={'Exchanges:' + overview.exchanges}
                    color="secondary"
                  />
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={'Queues:' + overview.queues}
                    color="secondary"
                  />
                  <Chip
                    className={classes.chip}
                    variant="outlined"
                    size="small"
                    label={'Consumers:' + overview.consumers}
                    color="secondary"
                  />
                </div>
              </CardContent>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </div>
  );
}
