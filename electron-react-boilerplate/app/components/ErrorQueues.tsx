import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import Paper from '@material-ui/core/Paper';
import styles from './ErrorQueues.css';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import routes from '../constants/routes.json';
import enviroments from '../constants/enviroments.json';
import { Button, Snackbar, IconButton, TableContainer } from '@material-ui/core';
import Footer from './Footer';
import TableItem from './TableItem';
import TableHeader from './TableHeader';

function Alert(props: JSX.IntrinsicAttributes) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ErrorQueues() {

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
      color: 'white',
      border: '1px solid white'
    }
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const openSnackbar = (message: string, alertType: string) => {
    setMessage(message);
    setOpen(true);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  const [data, setData] = useState({});
  const [purgeData, purgeSetData] = useState({});
  const [requeueData, requeueSetData] = useState({});
  const [purgeDialogOpen, setpurgeDialogOpen] = React.useState({ value: '', state: false });

  async function fetchData() {
    const res = await fetch(enviroments.apiUrl + "rabbitmq/queuesError");
    let data = await res.json();
    data.apiResponse = data.apiResponse.sort((a: { messages: number; }, b: { messages: number; }) => (a.messages > b.messages) ? -1 : 1);
    setData(data)
  }

  async function purgeQueue(queueName: string) {
    const res = await fetch(enviroments.apiUrl + "rabbitmq/purge/" + queueName, { method: 'DELETE' });
    const purgeData = await res.json();
    purgeSetData(purgeData);
  }

  async function reQueue(queueName: string) {
    const res = await fetch(enviroments.apiUrl + "rabbitmq/requeue", { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ queueName: queueName }) });
    const requeueData = await res.json();
    requeueSetData(requeueData);
  }

  useEffect(() => {
    fetchData();

    let refreshInterval = window.localStorage.getItem('refreshInterval');
    if (refreshInterval && parseInt(refreshInterval) > 0) {
      const interval = setInterval(() => {
        fetchData();
      }, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [])

  function requeue(queueName: string) {
    let result = reQueue(queueName);
    result.then(() => {
      openSnackbar('Queue is requeued', 'success');
    }).catch((error) => {
      openSnackbar(error, 'error');
    })
  }

  function purge() {
    let result = purgeQueue(purgeDialogOpen.value);
    result.then(() => {
      openSnackbar("Queue is cleaned", 'success');
    }).catch((error) => {
      openSnackbar(error, 'error');
    })
  }

  const dialogOpen = (value: string) => {
    setpurgeDialogOpen({ value: value, state: true });
  };

  const dialogClose = () => {
    setpurgeDialogOpen({ value: '', state: false });
  };

  function Item(data: any) {
    if (parseInt(data.queue.messages) > 0) {

      return (<TableItem queue={data.queue} dialogOpen={dialogOpen} requeue={requeue} />);
    }
    return null;
  }

  return (
    <Container fixed>
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div className={styles.backButton} data-tid="backButton">
              <Link to={routes.HOME}>
                <i className="fa fa-arrow-left fa-3x" />
              </Link>
            </div>
          </Grid>
          <Grid item xs={12}>

            <h1 className={styles.header} color="error">Error Queues</h1>

          </Grid>
          <Grid item md={12}>
            <TableContainer component={Paper} className={classes.container}>
              <Table>
                <TableHead>
                  <TableHeader response={data.apiResponse} />
                </TableHead>
                <TableBody>
                  {data.apiResponse && data.apiResponse.map(queue => (
                    <Item queue={queue} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={open}
              autoHideDuration={2000}
              onClose={() => closeSnackbar()}
              message="Note archived"
              action={
                <React.Fragment>
                  <IconButton size="small" aria-label="close" color="inherit" onClick={() => closeSnackbar()}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            >
              <Alert severity="success">
                {message}
              </Alert>
            </Snackbar>
          </Grid>
          <Grid item md={6} xs={6} sm={3}>
            <Footer />
          </Grid>
        </Grid>
      </div>
      <Dialog
        open={purgeDialogOpen.state}
        onClose={dialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Purge Dialog"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All Queue data will be deleted.Are you sure?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={dialogClose} color="primary">
            No
          </Button>
          <Button onClick={() => purge()} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
