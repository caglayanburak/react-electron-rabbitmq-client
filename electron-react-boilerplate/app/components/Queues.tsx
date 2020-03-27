import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Queues.css';
import routes from '../constants/routes.json';
import { List,ListItem, Container } from '@material-ui/core';

export default function Queues() {

  return (
    <Container fixed>
      <div className={styles.backButton} data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>

      <div className={styles.btnGroup}>
      <List>
        <ListItem>
          <Link to={routes.Error}>> Error Queues</Link>
        </ListItem>
        <ListItem>
          <Link to={routes.Business}>> Business Queues</Link>
        </ListItem>
      </List>
      </div>
    </Container>
  );
}