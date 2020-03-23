import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import BusinessQueues from './components/BusinessQueues';
import Queues from './components/Queues';
import ErrorQueues from './components/ErrorQueues';
import Home from './components/Home';
import Footer from './components/Footer';
import TableItem from './components/TableItem';
import TableHeader from './components/TableHeader';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.Queues}>
          <Queues />
        </Route>
        <Route exact path={routes.HOME}>
          <Home />
        </Route>
        <Route path={routes.Error}>
          <ErrorQueues />
        </Route>
        <Route path={routes.Business}>
          <BusinessQueues />
        </Route>
        <Route path={routes.Footer}>
          <Footer />
        </Route>
        <Route path={routes.TableItem}>
          <TableItem />
        </Route>
        <Route path={routes.TableHeader}>
          <TableHeader />
        </Route>
      </Switch>
    </App>
  );
}
