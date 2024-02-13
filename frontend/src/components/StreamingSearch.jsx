import React, {useState} from "react";
import styles from "./comp.module.css";



const StreamingSearch = () => {

    const [imdbId, setImdbId] = useState("");
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState([]);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`http://localhost:8081/streamingSearch/${imdbId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });
          const data = await response.json();
    
          if (response.ok) {
            setTitle(data.title);
            setOptions(data.options);
            setMessage("");
          } else {
            setMessage(data.message);
            setTitle("");
            setOptions([]);
          }
        } catch (error) {
          console.error('Erro ao enviar dados para o backend:', error);
          setMessage('Erro ao se comunicar com o servidor');
          setMovies([]);
        }
      };

    return (
        <div className={styles.wrapper}>
            <div className={styles.formdiv}>
                <h1>Procurar filme:</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.formlabel}>
                    Id:
                    <input type="text" value={imdbId} onChange={(e) => setImdbId(e.target.value)} />
                    </label>
                    <button className={styles.formbutton} type="submit">Procurar</button>
                </form>

                {message && <p className={styles.messageerror}>{message}</p>}
            </div>

            {options.length > 0 && (
                <div>
                <h2>{title}</h2>
                <ul className={styles.movielist}>
                    {options.map(option => (
                    <li className={styles.movieitem} key={option}>
                        <div className={styles.movieinfo}>
                            <h3>Serviço: {option.service}</h3>
                            <h3>Tipo: {option.streamingType}</h3>
                            <h3><a href={option.link} target="_blank" rel="noopener noreferrer">Acessar</a></h3>
                        </div>
                    </li>
                    ))}
                </ul>
                </div>
            )}
    </div>
    );
};

export default StreamingSearch;