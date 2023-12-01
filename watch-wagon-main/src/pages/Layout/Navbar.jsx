import React from "react";
import './Navbar.css'
import MovieApiService from "../../services/movieApi.service";
const Navbar = () => {
  const logout = ()=> {
    MovieApiService.logout();
  }
  return (
    <div>
    <nav className="navbar navbar-expand bg-warning">
      <div className="container-fluid">
            <a className="navbar-brand" href="/">Watch Wagon</a>
            <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button className="navbar-search" type="submit">Search</button>
            </form>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link" href="/">Início</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/profile">Perfil</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" onClick={logout} href="#">Logout</a>
                </li>
            </ul>
      </div>
    </nav>
    </div>

  );
};

export default Navbar;