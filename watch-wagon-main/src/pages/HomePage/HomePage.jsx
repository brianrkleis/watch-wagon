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
          {this.state.movies.map((value) => (
            <div onClick={()=>this.goToMovie(value.id)}key={value.id} className="movie-card">
              <img src={value.image} alt={value.title} />
              <h2>{value.title}</h2>
            </div>
          ))}
        </div>
      </div>
      </Layout>
    );
  }
}

export default HomePage;
