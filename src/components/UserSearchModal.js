import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import M from "materialize-css";

const UserSearchModal = () => {
  const { state } = useContext(UserContext);

  const searchModal = useRef(null);
  const [search, setSearch] = useState("");
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    M.Modal.init(searchModal.current);
  }, []);

  const fetchUsers = async (query) => {
    setSearch(query);
    const result = await fetch("/search-users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    });
    const { user } = result.json();
    setUserDetails(user);
  };

  return (
    <div id="modal1" class="modal" ref={searchModal} style={{ color: "black" }}>
      <div className="modal-content">
        <input
          type="text"
          placeholder="search users"
          value={search}
          onChange={(e) => fetchUsers(e.target.value)}
        />
        <ul className="collection">
          {userDetails.map((item) => {
            return (
              <Link
                to={
                  item._id !== state._id ? "/profile/" + item._id : "/profile"
                }
                onClick={() => {
                  M.Modal.getInstance(searchModal.current).close();
                  setSearch("");
                }}
              >
                <li className="collection-item">{item.email}</li>
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