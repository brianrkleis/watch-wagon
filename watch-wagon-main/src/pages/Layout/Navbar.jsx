import React from "react";
import './Navbar.css'
const Navbar = () => {
  const logout = ()=> {
    localStorage.clear();
    window.location.href='/login';
  }
  return (
    <div>
    <nav class="navbar navbar-expand bg-warning">
      <div class="container-fluid">
            <a class="navbar-brand" href="#">Watch Wagon</a>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="navbar-search" type="submit">Search</button>
            </form>
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="#">Início</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Perfil</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="./watchlist">Minha Lista</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" onClick={logout} href="#">Logout</a>
                </li>
            </ul>
      </div>
    </nav>
    </div>

  );
};

export default Navbar;