import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import { UserAction } from "../redux/userReducer";
import UserSearchModal from "./UserSearchModal";

const NavLinks = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => !!state);
  const history = useHistory();

  const onLogout = () => {
    localStorage.clear();
    dispatch({ type: UserAction.LOGOUT });
    history.push("/signin");
  };
  if (isAuthenticated) {
    return [
      <li key="1">
        <i
          data-target="modal1"
          className="large material-icons modal-trigger"
          style={{ color: "black" }}
        >
          search
        </i>
        <UserSearchModal />
      </li>,
      <li key="2">
        <Link to="/profile">Profile</Link>
      </li>,
      <li key="3">
        <Link to="/create-post">Create Post</Link>
      </li>,
      <li key="4">
        <Link to="/subscribed-user-posts">My following Posts</Link>
      </li>,
      <li key="5">
        <button className="btn #c62828 red darken-3" onClick={onLogout}>
          Logout
        </button>
      </li>,
    ];
  } else {
    return [
      <li key="6">
        <Link to="/signin">Signin</Link>
      </li>,
      <li key="7">
        <Link to="/signup">Signup</Link>
      </li>,
    ];
  }
};
export default NavLinks;
