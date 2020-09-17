import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

import "./Navbar.css";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const { state } = useContext(UserContext);
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
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
