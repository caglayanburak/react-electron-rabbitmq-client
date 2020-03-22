import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';

export default function Home() {
  return (
    <div className={styles.container} data-tid="container">
      <img src="https://logodix.com/logo/1664371.png" width="300px" /><span className={styles.headerSpan}> Desktop Client</span>
      <br/>
      <Link to={routes.Queues}>Enter >></Link>
    </div>
  );
}
