import axios from 'axios';

export default class MovieApiService {
    static url() {
        return process.env.MOVIE_API_URL;
    }
    static config() {
        let token = localStorage.getItem('token');
        if (!token) {
            throw Error('Must do login');
        }
        return new axios.AxiosHeaders({'Authorization': 'Token ' + token});
    }

    LoginForm = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState(null);
    
      const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
          // Make a POST request to your login endpoint
          const response = await axios.post('localhost/login', {
            username,
            password,
          });
          if (response.status !== 201) {
            return false;
          }
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.token);
          return true; 
          
        } catch (err) {
          // Handle login error
          setError('Invalid username or password');
          console.error('Login error:', err);
        }
      };
    }
}