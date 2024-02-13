import React from 'react';
import { Link } from 'react-router-dom';
import styles from './menu.module.css';

const Menu1 = () => {
  return (
    <div>
      <nav className={styles.menubar}>
        <ul className={styles.menulist}>
          <li className={styles.menulistli}>
            <Link to="/movieSearch" >Procurar Filme</Link>
          </li>
          <li className={styles.menulistli}>
            <Link to="/streamingSearch">Disponibilidade em Streaming</Link>
          </li>
          <li className={styles.menulistli}>
            <Link to="/login" >Login</Link>
          </li>
          <li className={styles.menulistli}>
            <Link to="/signup">Cadastro</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Menu1;