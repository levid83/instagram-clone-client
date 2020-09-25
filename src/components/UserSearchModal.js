import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import M from "materialize-css";

import UserService from "../services/User.service";

const userService = new UserService();

const UserSearchModal = () => {
  const user = useSelector((state) => state);

  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const searchUsers = async (query) => {
    setSearch(query);
    if (query.length < 3) return;
    const users = await userService.searchUser(query);
    if (users) setUsers(users);
  };

  return (
    <div
      id="modal1"
      className="modal"
      ref={searchModal}
      style={{ color: "black" }}
    >
      <div className="modal-content">
        <input
          type="text"
          placeholder="search users"
          value={search}
          onChange={(e) => searchUsers(e.target.value)}
        />
        <ul className="collection">
          {users.map((u) => {
            return (
              <Link
                to={u._id !== user._id ? "/user-profile/" + u._id : "/profile"}
                onClick={() => {
                  M.Modal.getInstance(searchModal.current).close();
                  setSearch("");
                }}
                key={u._id}
              >
                <li className="collection-item">{u.email}</li>
              </Link>
            );
          })}
        </ul>
      </div>
      <div className="modal-footer">
        <button
          className="modal-close waves-effect waves-green btn-flat"
          onClick={() => setSearch("")}
        >
          close
        </button>
      </div>
    </div>
  );
};

export default UserSearchModal;
