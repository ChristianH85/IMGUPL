import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav id='logo' class="navbar navbar-fixed navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand"  href="/">Image Uploader</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse float-right" id="navbarNav">
      <ul class="navbar-nav ">
        <li class="nav-item ">
          <Link class="nav-link" to="/">Gallery <span class="sr-only">(current)</span></Link>
        </li>
        <li class="nav-item">
          <Link class="nav-link" to="/upload">Upload</Link>
        </li>
      </ul>
    </div>
  </nav>
  //   <nav id='logo' className="navbar navbar-expand-lg">
  //     <a href="/">
  //     Image Uploader
  //     </a>
  //   </nav>
  );
}

export default Nav;
