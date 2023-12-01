import React, { Component } from "react";
import MovieApiService from "../../services/movieApi.service";
import Layout from "../Layout/Layout";
import "./HomePage.css";

class HomePage extends Component {

  state = { movies: [] };

  async componentDidMount() {
    this.setState({
      movies: await MovieApiService.getMovies(),
    });
  }

  goToMovie(movieId){
    window.location.href='/movie/'+ movieId;
  }
  

  render() {
    return (
        <Layout>
          <div className="home-page">
            <div className="movie-list">
              {Object.entries(this.state.movies).map(([key, value]) => (
                <div key={key} className="container-fluid">
                  <h4>{key}</h4>

                  <div style={{overflowX: 'scroll', whiteSpace: 'nowrap'}} className="flex-row flex-nowrap">
                  {
                    value.map((movie) => (
                      <div onClick={()=>this.goToMovie(movie.id)}key={movie.id} className="movie-card" style={{height: '350px', cursor: 'pointer'}}>
                        <img className="img-fluid" style={{height: '320px', objectFit: 'cover'}} src={movie.image} alt={movie.title} />
                        <h2>{movie.title}</h2>
                      </div>
                    ))
                  }
                  </div>
                </div>
              ))}
            </div>
          </div>
      </Layout>
    );
  }
}

export default HomePage;
