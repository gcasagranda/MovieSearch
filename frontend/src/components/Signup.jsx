import React, {useState} from "react";
import styles from "./comp.module.css";

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null);
    const [messageClass, setMessageClass] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch('http://localhost:8081/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok){
            setMessageClass("messageok");
        }else{
            setMessageClass("messageerror");
        }
        setMessage(data.message);
        setUsername("");
        setPassword("");
      } catch (error) {
        console.error('Erro ao enviar dados para o backend:', error);
      }
    };
  
    return (
        <div className={styles.formdiv}>
            <h1>Cadastro</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.formlabel}>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label className={styles.formlabel}>
                    Senha:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button className={styles.formbutton} type="submit">Cadastrar</button>
            </form>
            {message && <p className={`${styles[messageClass]} ${styles.message}`}>{message}</p>}
        </div>
      
    );
  };
  

export default Signup;