import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./NavBar.css";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => !!state);
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link
          to={isAuthenticated ? "/" : "/signin"}
          className="brand-logo left"
        >
          Instagram
        </Link>
        <ul id="nav-mobile" className="right">
          <NavLinks />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
