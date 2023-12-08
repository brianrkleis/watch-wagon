import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/MoviePage/MoviePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Register from "./pages/Register/Register";
import ProfilePage from "./pages/Profile/Profile";
import SearchPage from "./pages/Search/Search";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
        <Route path="/" element={<HomePage />}>
        </Route>
        <Route path="/movie/:movieId" element={<MoviePage />}>
        </Route>
        <Route path="/profile" element={<ProfilePage />}>
        </Route>
        <Route path="/search" element={<SearchPage />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);