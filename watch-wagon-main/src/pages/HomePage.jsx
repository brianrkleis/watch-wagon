import { Component } from "react";
import MovieApiService from "../services/movieApi.service";

export default class HomePage extends Component{

    state = {movies: []}

    async componentDidMount(){
        this.setState({
            movies: await MovieApiService.getMovies(),
        });
    }
    render(){
        return <>
            {this.state.movies.map((value)=>{
                return <p key={value.id}>{value.title}</p>
            })}
        </>
    }
}