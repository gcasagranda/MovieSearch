import React, {useState, useEffect} from "react";
import styles from "./comp.module.css";

const Watchlist = () => {

    const [message, setMessage] = useState("");
    const [movies, setMovies] = useState([]);
    const userId = localStorage.getItem("idUser");

    const getMovies = async () => {

        try{
            const response = await fetch(`http://localhost:8081/watchlist/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            if (response.ok) {
                setMovies(data.watchlist);
                setMessage("");
            } else {
                setMessage(data.message);
                setMovies([]);
            }
        }catch (error) {
            console.error('Erro ao enviar dados para o backend:', error);
            setMessage('Erro ao se comunicar com o servidor');
            setMovies([]);
        }
    }

    useEffect(() => {
        getMovies();
    }, []);

    return (
        <div className={styles.wrapper}>
            {message && <p className={styles.messageerror}>{message}</p>}
            {movies.length > 0 && (
                <div>
                <h2>Watchlist:</h2>
                <ul className={styles.movielist}>
                    {movies.map(movie => (
                    <li className={styles.movieitem} key={movie.imdbId}>
                        <img className={styles.movieposter} src={movie.poster} alt={movie.title} />
                        <div className={styles.movieinfo}>
                            <h3>id: {movie.imdbId}</h3>
                        <h3 className={styles.movietitle}>{movie.title}</h3>
                        <p className={styles.moviereleaseyear}>Ano de Lançamento: {movie.year}</p>
                        </div>
                    </li>
                    ))}
                </ul>
                </div>
            )}
    </div>
    );
};

export default Watchlist;