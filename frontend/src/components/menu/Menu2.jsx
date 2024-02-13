import React from 'react';
import { Link } from 'react-router-dom';
import styles from './menu.module.css';

const Menu2 = () => {
  return (
    <div>
      <nav className={styles.menubar}>
        <ul className={styles.menulist}>
          <li className={styles.menulistli}>
            <Link to="/movieSearch" >Procurar Filme</Link>
          </li>
          <li className={styles.menulistli}>
            <Link to="/streamingSearch" >Disponibilidade em Streaming</Link>
          </li>
          <li className={styles.menulistli}>
            <Link to="/watchlist">Sua Watchlist</Link>
          </li>
          <li className={styles.menulistli}>
            <Link to="/logout" >Logout</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu2;