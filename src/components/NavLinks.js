import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { UserContext } from "../App";
import { UserAction } from "../reducers/userReducer";
import UserSearchModal from "./UserSearchModal";

const NavLinks = () => {
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();

  const onLogout = () => {
    localStorage.clear();
    dispatch({ type: UserAction.LOGOUT });
    history.push("/signin");
  };
  if (state) {
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
        <Link to="/create">Create Post</Link>
      </li>,
      <li key="4">
        <Link to="/myfollowingpost">My following Posts</Link>
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
