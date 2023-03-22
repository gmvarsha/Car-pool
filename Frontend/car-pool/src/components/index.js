import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-primary">
      <a class="navbar-brand" href="#"><i><b style={{ color: "darkblue" }}>Car Pool</b></i></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <Link to="/" class="nav-link" >Home</Link>
          </li>
          <li class="nav-item">
            <Link to="/login" class="nav-link" >Login</Link>
          </li>
          <li class="nav-item">
            <Link to="/register" class="nav-link" >Register
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;