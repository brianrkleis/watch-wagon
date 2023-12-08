import { Component, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import MovieApiService from "../../services/movieApi.service";
import Layout from "../Layout/Layout";

const SearchPage = () => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Exemplo de como obter um parâmetro específico
    const q = queryParams.get('q');


    useEffect(() => {
        const fetchMovies = async () => {
            const moviesData = await MovieApiService.searchMovies(q);
            setMovies(moviesData);
        };
        fetchMovies();
    }, [q]);

    const goToMovie= (movieId) => {
        window.location.href='/movie/'+ movieId;
        }

    return (
        <Layout>
            <div className="container">
                <div className="row mt-5">
                    <div className="col">
                        <h2>Resultados de "{q}"</h2>
                        <hr />
                        <div className="row">
                            {movies.map((movie, idx) => (
                                <div className="col-2 me-4">
                                    <div onClick={()=>this.goToMovie(movie.id)}key={movie.id} className="movie-card" style={{height: '350px', cursor: 'pointer'}}>
                                        <img className="img-fluid" style={{height: '290px', objectFit: 'cover'}} src={movie.image} alt={movie.title} />
                                        <h2>{movie.title}</h2>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
export default SearchPage;