import axios from 'axios';

export default class MovieApiService {

    static url() {
        return process.env.MOVIE_API_URL;
    }

    static config() {
        let token = localStorage.getItem('token');
        if (!token) {
            window.location.href='/login';
        }
        return new axios.AxiosHeaders({'Authorization': token});
    }

    static async axiosCall(method, uri, data = undefined, useAuth = true) {
      let response;
      try {
          response = await axios({
              method: method,
              url: process.env.REACT_APP_API_URL + uri,
              data: data,
              headers: useAuth ? this.config() : undefined
          })
    
      } catch (e) {
        if (e.response.status === 500) window.location.href = "/login";
          response = e.response;
      }
      return response;
    }

    static async getMovies() {
      const response = await this.axiosCall('get','/genre');
      if(response.status === 200){
        return response.data;
      }
      MovieApiService.logout();
    }   

    static async getMovie(movieId) {
      const response = await this.axiosCall('get', '/movies/'+ movieId);
      
      if(response.status === 200){
        return response.data;
      }
      return null;
    }

    static async login(data) {
      try {
        // Make a POST request to your login endpoint
        const response = await axios.post(process.env.REACT_APP_API_URL + "/login", data);
        if (response.status !== 201) {
          return false;
        }
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('token', response.data.token);
        return true; 
        
      } catch (err) {
        // Handle login error
        console.error('Login error:', err);
      }
    }

    static async register(data) {
      const response = await this.axiosCall('post', '/register', data, false);
      return response.data;
    }

    static async logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('token'); 
      window.location.href = "/login";
    }

    static async createRent(data) {
      const response = await this.axiosCall('post', '/rent', data);
      return response.data;
    }

    static async getUser() {
      const user = localStorage.getItem('user');
      
      if (user == 'undefined') {
        window.location.href = "/login";
      }
      const response = await this.axiosCall('get', '/users/' + JSON.parse(user).id);
      
      return response.data;
    }

    static async searchMovies(q) {
      const response = await this.axiosCall('get', '/movies/search?q=' + q);
      return response.data;
    }

    static async getMovieStats(movieId) {
      const response = await this.axiosCall('get', '/movies/' + movieId + '/stats?userId=' + JSON.parse(localStorage.getItem('user')).id);

      return response.data;
    }

    static async rentMovie(movieId, data) {
      const response = await this.axiosCall('post', '/rent', {...data, user_id: JSON.parse(localStorage.getItem('user')).id});

      return response.data;
    }

    static async addToWatchList(movieId) {
      const response = await this.axiosCall('post', '/watchList/' + JSON.parse(localStorage.getItem('user')).id + '/' + movieId);

      return response.data;
    }

    static async removeFromWatchList(movieId) {
      const response = await this.axiosCall('delete', '/watchList/' + JSON.parse(localStorage.getItem('user')).id + '/' + movieId);

      return response.data;
    }

    static async updateUser(data) {
      const response = await this.axiosCall('put', '/users/' + JSON.parse(localStorage.getItem('user')).id, data);
      return response.data;
    }
}