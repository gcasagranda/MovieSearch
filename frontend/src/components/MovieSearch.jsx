import React, { useState, useEffect } from "react";
import styles from "./comp.module.css";

const MovieSearch = () => {
  const [keyword, setKeyword] = useState("");
  const [message, setMessage] = useState("");
  const [movies, setMovies] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setIsAuthenticated(!!storedToken);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8081/moviesearch/${keyword}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const data = await response.json();

      if (response.ok) {
        // Se a resposta for bem-sucedida, atualize o estado dos filmes
        setMovies(data);
        setMessage("");
      } else {
        // Se houver um erro, exiba a mensagem de erro
        setMessage(data.message);
        setMovies([]);
      }
    } catch (error) {
      console.error('Erro ao enviar dados para o backend:', error);
      setMessage('Erro ao se comunicar com o servidor');
      setMovies([]);
    }
  };

    const handleAddWatchlist = async (movieid, movietitle, moviereleaseYear, movieposterUrl) => {
        try {
            const response = await fetch('http://localhost:8081/addwatchlist', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: localStorage.getItem("idUser"),
                    title: movietitle,
                    year: moviereleaseYear,
                    imdbId: movieid,
                    poster: movieposterUrl
                }),
            });
            await response.json();
            if (response.ok)
                alert('Filme adicionado à Watchlist!');
        } catch (error) {
          console.error('Erro ao enviar dados para o backend:', error);
        }
    };

  return (
    <div className={styles.wrapper}>
        <div className={styles.formdiv}>
            <h1>Procurar filme:</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <label className={styles.formlabel}>
                Título:
                <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
                </label>
                <button className={styles.formbutton} type="submit">Procurar</button>
            </form>

            {message && <p className={styles.messageerror}>{message}</p>}
        </div>
      

      {movies.length > 0 && (
        <div>
          <h2>Resultados:</h2>
          <ul className={styles.movielist}>
            {movies.map(movie => (
              <li className={styles.movieitem} key={movie.id}>
                <img className={styles.movieposter} src={movie.posterUrl} alt={movie.title} />
                <div className={styles.movieinfo}>
                    <h3>id: {movie.id}</h3>
                  <h3 className={styles.movietitle}>{movie.title}</h3>
                  <p className={styles.moviereleaseyear}>Ano de Lançamento: {movie.releaseYear}</p>
                  {isAuthenticated ? (
                    <>
                    <button className={styles.formbutton} 
                    onClick={() => handleAddWatchlist(movie.id, movie.title, movie.releaseYear, movie.posterUrl)}>Adicionar à Watchlist</button>
                    </>
                    ) : (
                        <>
                        </>
                    )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;