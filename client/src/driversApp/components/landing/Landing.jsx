import React from 'react';
import styles from './landing.module.css';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className={styles.container}>
      <Link to="/home">
        <button className={styles.btn}>go inside</button>
      </Link>
    </div>
  )
}

export default Landing
