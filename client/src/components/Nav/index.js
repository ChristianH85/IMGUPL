import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav id='logo' className="navbar navbar-fixed navbar-expand-lg d-flex ">
    <a className="navbar-brand"  href="/">Image Uploader</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
    </button>
    <div className="collapse navbar-collapse flex-row-reverse" id="navbarNav">
      <ul className="navbar-nav ">
        <li className="nav-item ">
          <Link className="nav-link" to="/">Gallery </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/upload">Upload</Link>
        </li>
      </ul>
    </div>
  </nav>
  
  );
}

export default Nav;
