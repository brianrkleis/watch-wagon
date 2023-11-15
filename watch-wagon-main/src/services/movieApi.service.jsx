import axios from 'axios';

export default class MovieApiService {
    static url() {
        return process.env.MOVIE_API_URL;
    }


    static headers() {
        return new axios.AxiosHeaders({
            'X-RapidAPI-Key': 'cef9bd5244msh252c303b1ee3d60p1fb887jsn7343ce627670',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        });
    }
    async static getMoviesNetflix() {
        return await axios.get(this.url() + '/changes', {
            headers: this.headers()
        });
    }
}