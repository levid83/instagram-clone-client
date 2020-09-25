import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

import UserSearchModal from "./UserSearchModal";
import NavLinks from "./NavLinks";

const Navigation = styled.ul`
  & .search {
    color: black;
  }
`;

const SideNav = styled.ul`
  & li {
    padding: 0 32px;

    & a {
      padding: 0;
    }
  }
`;

const BrandLogoLink = styled(Link)`
  font-family: "Grand Hotel", cursive;
  font-size: 1.5em;
  @media (max-width: 992px) {
    margin-right: 20px;
    float: right !important;
  }
`;

const NavBar = () => {
  const isAuthenticated = useSelector((state) => !!state);
  useEffect(() => {
    const M = window.M;
    document.addEventListener("DOMContentLoaded", function () {
      const elems = document.querySelectorAll(".sidenav");
      M.Sidenav.init(elems, {});
    });
  }, []);
  return (
    <>
      <Navigation className="navbar-fixed">
        <nav>
          <div className="nav-wrapper white">
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a href="#!" data-target="nav-mobile" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>
            <BrandLogoLink to={isAuthenticated ? "/" : "/signin"}>
              Instagram
            </BrandLogoLink>
            <ul className="right hide-on-med-and-down">
              <NavLinks />
            </ul>
          </div>
        </nav>
      </Navigation>
      <SideNav className="sidenav sidenav-close right" id="nav-mobile">
        <NavLinks />
      </SideNav>
      <UserSearchModal />
    </>
  );
};

export default React.memo(NavBar);
