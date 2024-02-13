import React, { useState } from "react";
import styles from "./comp.module.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', "usuário logado");
        localStorage.setItem("idUser", data.idUser);
        console.log(data.idUser);
        setMessage(null);
        window.location.reload();
        navigateTo("/");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
    }
  };

  return (
    <div className={styles.formdiv}>
      <h1>Login</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.formlabel}>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label className={styles.formlabel}>
          Senha:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className={styles.formbutton} type="submit">Login</button>
      </form>
      {message && <p className={styles.messageerror}>{message}</p>}
    </div>
  );
};

export default Login;
