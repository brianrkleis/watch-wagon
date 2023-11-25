import React, { useState, useEffect } from "react";
import "./MoviePage.css";
import { useParams } from "react-router-dom";
import MovieApiService from "../../services/movieApi.service";
import Layout from "../Layout/Layout";

const MoviePage = () => {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await MovieApiService.getMovie(movieId);
      setMovie(movieData);
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div className="movie-page">
      {movie === null ? (
        <p>Carregando...</p>
      ) : (
        <Layout>
          <div className="movie-details">
            <div className='border'>
            <img src={movie.image} alt={movie.title} />
            </div>
            <div className="movie-info">
              <h1>{movie.title}</h1>
              <p>
                <strong>Ano:</strong> {movie.year}
              </p>
              <p>
                <strong>Duração:</strong> {movie.duration} minutos
              </p>
              <p>
                <strong>Elenco:</strong> {movie.casting}
              </p>
              <p>{movie.description}</p>
            </div>
          </div>
          </Layout>
      )}
    </div>
  );
};

export default MoviePage;
