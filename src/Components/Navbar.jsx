import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <>
      <div>
        <div className="container navbar-container">
          <div className="row">
            <div className="nav-header">
              <div className="logo">
                <figure className="logo__img--wrapper">
                  <img src={logo} alt="" className="logo__img" />
                </figure>
                <span className="logo__text">
                  eb<span className="text--accent">flix</span>
                </span>
              </div>
              <div className="nav-header__links">
                <Link to="/">Home</Link>
                <Link to="/">Favorites</Link>
                <button className="nav-header__links--btn">Contact</button>
              </div>
            </div>
            <div className="nav-footer">
              <h3>Browse Movies</h3>
              <div className="nav-footer__input--wrapper">
                <input
                  type="text"
                  placeholder="Search by Title"
                  className="nav-footer__input"
                />
                <FontAwesomeIcon
                  className="nav-footer__input--icon"
                  icon={faMagnifyingGlass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
