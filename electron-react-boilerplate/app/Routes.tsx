import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import BusinessQueues from './components/BusinessQueues';
import ErrorQueues from './components/ErrorQueues';
import Home from './components/Home';
import Footer from './components/Footer';
import TableItem from './components/TableItem';
import TableHeader from './components/TableHeader';
import PublishQueue from './components/PublishQueue';
import ButtonAppBar from './components/AppBar';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import PublishQueuePage from './containers/PublishQueuePage';

export default function Routes() {
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    },
    control: {
      padding: theme.spacing(2)
    }
  }));
  const [spacing, setSpacing] = React.useState(2);
  const classes = useStyles();
  return (
    <App>
        <ButtonAppBar />

        <Grid container className={classes.root} spacing={9}>
          <Grid container justify="left">
            <div className={classes.root}></div>
          </Grid>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            item
            xs={12}
          >
            <Switch>
              <Route exact path={routes.HOME}>
                <Home />
              </Route>
              <Route path={routes.Error}>
                <ErrorQueues />
              </Route>
              <Route path={routes.Business}>
                <BusinessQueues />
              </Route>
              <Route sensitive path={routes.Publish}>
                <PublishQueuePage />
              </Route>
              <Route path={routes.TableItem}>
                <TableItem />
              </Route>
              <Route path={routes.TableHeader}>
                <TableHeader />
              </Route>
             
            </Switch>
          </Grid>
        </Grid>
    </App>
  );
}
